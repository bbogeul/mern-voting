require('dotenv').config();
const db = require('../models');

// test user
const users = [
  {
    username: 'joseph',
    firstName: 'joseph',
    lastName: 'lee',
    password: 'password',
  },
];

const polls = [{ question: 'testing', options: ['Angular', 'Vue'] }];

const seed = async () => {};

console.log('seeding');
