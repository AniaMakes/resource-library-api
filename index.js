const port = process.env.API_PORT;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { selectAllBookmarks, saveBookmark } = require('./models');

app.use(bodyParser.json());

app.get('/bookmarks', (req, res, next) => {
  selectAllBookmarks().then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    next(err);
  });
});

app.post('/bookmark', (req, res, next) => {
  const { title, description, url } = req.body;
  saveBookmark(title, description, url).then((data) => {
    res.status(201).json(data);
  }).catch((err) => {
    next(err);
  });
});

app.use((req, res) => {
  res.status(404).send(':( NOPES. Nothing to see here');
});

app.use((err, req, res) => {
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
