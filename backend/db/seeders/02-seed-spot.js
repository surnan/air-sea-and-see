'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
  options.tableName = "Spots"
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([ 
      {
        ownerId: 3,
        address: "One Park Avenue",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.746052095477836,
        lng: -73.98142495133493,
        name: "NYU Langone Headquarters",
        description: "Sleep, get healed, get paid !!",
        price: 3000,
      },
      {
        ownerId: 1,
        address: "78 Cottage Street",
        city: "Jersey City",
        state: "NJ",
        country: "USA",
        lat: 40.73546808655058,
        lng: -74.0622927904529,
        name: "Peachtree Suites",
        description: "Sleep, recharge, privacy & high quality & cheap price",
        price: 1000,
      },
      {
        ownerId: 2,
        address: "1072 Elder Ave",
        city: "Bronx",
        state: "NY",
        country: "USA",
        lat: 40.82595300239568,
        lng: -73.87838826939743,
        name: "Boogy Down Bronx",
        description: "Where Hip Hop as born",
        price: 75,
      }
    ],
      { validate: true },
      options);
  },

  // async down(queryInterface, Sequelize) {
  //   return queryInterface.bulkDelete(options, {
  //     name: { [Op.in]: ['NYU Langone Headquarters', 'Peachtree Suites', 'Boogy Down Bronx'] }
  //   },{});
  // }
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['NYU Langone Headquarters', 'Peachtree Suites', 'Boogy Down Bronx'] }
    },{});
  }
};
