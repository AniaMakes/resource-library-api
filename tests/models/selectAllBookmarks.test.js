const { selectAllBookmarks, db } = require('../../models');

let response;

xdescribe('get all bookmarks', () => {
  beforeAll(async () => {
    await db.any('DELETE FROM bookmark');
    response = await selectAllBookmarks().then(data => data);
  });

  it('returns an array', () => {
    expect(response).toEqual([]);
  });

  afterAll(async () => {
    await db.any('DELETE FROM bookmark');
    db.$pool.end();
  });
});
