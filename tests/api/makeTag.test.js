const rp = require('request-promise');

const { url } = require('../helpers');

let response;

const tag = { tag: 'kitten' };

xdescribe('post a tag', () => {
  beforeAll(async () => {
    const options = {
      uri: `${url}/tag`,
      resolveWithFullResponse: true,
      method: 'POST',
      body: tag,
      json: true,
    };

    response = await rp(options).then(data => data.toJSON());
  });

  it('returns a status code of 201', () => {
    expect(response.statusCode).toBe(201);
  });

  it('returns a number', () => {
    expect(typeof response.body).toEqual('number');
  });
});
