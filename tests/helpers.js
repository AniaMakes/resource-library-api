const port = process.env.API_PORT;
module.exports = {
  url: `http://localhost:${port}`,
  typeOf: value => Object.prototype.toString.apply(value).replace(/\[object /, '').replace(/]/, '').toLowerCase(),
};
