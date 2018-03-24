const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

module.exports = {
  db,
};

Object.assign(module.exports, require('./bookmarks'));
