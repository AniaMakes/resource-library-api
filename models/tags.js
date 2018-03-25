const { db } = require('./');

function makeTag(tagName) {
  return db.one('INSERT INTO tag (tag_name) VALUES ($1) RETURNING id', [tagName])
    .then(data => data.id);
}

function findOrMakeTag(tagName) {
  return db.oneOrNone(`
    SELECT id FROM tag WHERE tag_name=$1`, [tagName], e => e && e.id)
    .then((id) => {
      if (id === !null) {
        return id;
      }
      return makeTag(tagName);
    });
}


function mapTagToBookmark(tagId, bookmarkId) {
  db.one('INSERT INTO bookmark_tag (bookmark_id, tag_id) VALUES ($1, $2)', [bookmarkId, tagId])
    .then(data => data);
}


module.exports = { makeTag, findOrMakeTag, mapTagToBookmark };
