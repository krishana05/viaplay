import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = 8000;

const app = express();
app.use(cors()); // allow any cross origin

// get api call to serve showlist json data
app.get('/shows', (req, res, next) => {
  fs.readFile(path.resolve('./data/shows.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to fetch the data');
    }
    if (data) {
      res.json(JSON.parse(data));
      //console.log(data);
    }
  });
});
// to serve react application
app.use('^/$', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to load page');
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
  console.log(`App launched on http://localhost:${PORT}/`);
});
