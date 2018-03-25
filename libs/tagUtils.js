
const { findOrMakeTag, mapTagToBookmark } = require('../models');

function tagStringToArray(tagsString) {
  return tagsString.split(',').map(string => string.trim());
}

function assignTags(tags, bookmarkId) {
  const tagArray = tagStringToArray(tags);
  tagArray.forEach(async (tag) => {
    const tagId = await findOrMakeTag(tag);
    await mapTagToBookmark(tagId, bookmarkId);
  });
}


module.exports = {
  assignTags,
  tagStringToArray,
};
