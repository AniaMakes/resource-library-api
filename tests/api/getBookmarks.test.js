const rp = require('request-promise');
const { url, typeOf } = require('../helpers');
const { db } = require('../../models');

let response;

const testBookmark = {
  title: 'The great Test',
  description: 'The greatest test ever written',
  url: 'test.test.test',
  tags: 'testing, programming, kittens',
};

describe('post a bookmark', () => {
  beforeAll(async () => {
    await db.any('DELETE FROM bookmark');
    await db.any('DELETE FROM bookmark_tag');
    await db.any('DELETE FROM tag');

    const options = {
      uri: `${url}/bookmark`,
      resolveWithFullResponse: true,
      method: 'POST',
      body: testBookmark,
      json: true,
    };
    response = await rp(options).then(data => data.toJSON());
  });

  afterAll(async () => {
    db.$pool.end();
  });

  it('returns a status code of 201', () => {
    expect(response.statusCode).toBe(201);
  });

  it('returns a number', () => {
    expect(typeof response.body).toEqual('number');
    testBookmark.id = response.body;
  });
});

describe('get all bookmarks', () => {
  beforeAll(async () => {
    const options = {
      uri: `${url}/bookmarks`,
      resolveWithFullResponse: true,
      method: 'GET',
    };
    response = await rp(options).then(data => data.toJSON());
  });

  it('returns a status code of 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('returns an array', () => {
    expect(typeOf(JSON.parse(response.body))).toEqual('array');
  });

  it('returns the bookmark we added', () => {
    expect(JSON.parse(response.body)).toContainEqual(testBookmark);
  });
});
