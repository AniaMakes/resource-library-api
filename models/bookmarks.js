const { db } = require('./');

function saveBookmark(title, description, url) {
  return db.one('INSERT INTO bookmark (title, description, url) VALUES ($1, $2, $3) RETURNING id', [title, description, url])
    .then(data => data.id);
}

function selectAllBookmarks() {
  return db.any('SELECT * FROM bookmark')
    .then(data => data);
}

module.exports = { saveBookmark, selectAllBookmarks };
