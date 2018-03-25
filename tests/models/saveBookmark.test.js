const { saveBookmark, db } = require('../../models');

let response;

xdescribe('add a bookmark', () => {
  beforeAll(async () => {
    await db.any('DELETE FROM bookmark');
    response = await saveBookmark('Title', 'Description', 'URL address')
      .then(data => data);
  });

  it('returns a numeric id', () => {
    expect(typeof response).toEqual('number');
  });

  afterAll(async () => {
    await db.any('DELETE FROM bookmark');
    db.$pool.end();
  });
});
