const { makeTag, db } = require('../../models');

let response;

describe('add a tag', () => {
  beforeAll(async () => {
    await db.any('DELETE FROM tag');
    response = await makeTag('kittens')
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
