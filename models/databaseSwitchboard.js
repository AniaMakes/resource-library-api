const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
})

function saveBookmark(bookmarkObject) {
  const {title, description, url, tags} = bookmarkObject;

  let bookmarkId = saveInBookmark(title, description, url);

  if(tags){
    processTags(tags, bookmarkId);
  }

}

function saveInBookmark(title, description, url){
  db.one(`INSERT INTO bookmark (title, description, url) VALUES ($1, $2, $3) RETURNING id`, [title, description, url])
  .then(data){
    return data;
  }
}

function searchTag(tagName){
  db.oneOrNone(`
    SELECT id FROM tag WHERE tag_name=$1`, [tagName], e => e && e.id)
    .then(data){
    if(data == !null){
      return data;
    } else {
      return makeTag(tagName);
    }
  }
}

function makeTag(tagName){
  db.one(`INSERT INTO tag (tag_name) VALUES ($1) RETURNING id`, [tagName])
    .then(data){
      return data;
    }
}

function processTags(tagsString, bookmarkId){
  const tagArray = tagsString.split(",");

  tagArray.forEach(function(tag){
    let str = tag.trim();
    let tagId = searchTag(str);
    mapTagToBookmark(tagId, bookmarkId);
  })

}

function mapTagToBookmark(tagId, bookmarkId){
  db.one(`INSERT INTO bookmark_tag (bookmark_id, tag_id) VALUES ($1, $2)`, [bookmarkId, tagId])
  .then(data){
    return data;
  }
}


module.exports = {
  saveBookmark,
  saveInBookmark,
  searchTag,
  makeTag,
  processTags,
  mapTagToBookmark
}
