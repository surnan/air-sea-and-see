// backend/routes/api/session.js
const bcrypt    = require('bcryptjs');
const express   = require('express')
const router    = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, setTokenCookie } = require('../../utils/auth');
const { Op } = require('sequelize');
const { User } = require('../../db/models');



const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
        const { credential, password } = req.body;
        const user = await User.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential
                }
            }
        });

        //(not user) or (req.user-password != table.user-hashPassword)
        if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { credential: 'The provided credentials were invalid.' };
            return next(err);
        }

        //succesful login: create res & prep JWToken creation
        const safeUser = {
            id:         user.id,
            email:      user.email,
            username:   user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);


// Log out
router.delete('/', (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);


// Current logged in user
router.get('/', (req, res) => {
        const { user } = req; //searching JWT
        if (user) {
            const safeUser = {
                id: user.id,
                email: user.email,
                username: user.username,
            };
            return res.json({user: safeUser});
        } else return res.json({ user: null });
    }
);


module.exports = router;