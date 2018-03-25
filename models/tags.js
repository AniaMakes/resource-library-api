const { db } = require('./');

function makeTag(tagName) {
  return db.one('INSERT INTO tag (tag_name) VALUES ($1) RETURNING id', [tagName])
    .then(data => data.id);
}

module.exports = { makeTag };
