const { findOrMakeTag, db } = require('../../models');

let response;

xdescribe('add a tag', () => {
  beforeAll(async () => {
    await db.any('DELETE FROM tag');
    response = await findOrMakeTag('kittens')
      .then(data => data);
  });

  it('returns a numeric id', () => {
    expect(typeof response).toEqual('number');
  });

  afterAll(async () => {
    await db.any('DELETE FROM tag');
    db.$pool.end();
  });
});
