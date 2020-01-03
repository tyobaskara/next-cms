const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoose = require('mongoose');
mongoose
  .connect(
    process.env.MONGO_SERV,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('mongo client connected');
    console.log(process.env.MONGO_SERV);
  })
  .catch(err => console.log(err));

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/users/profile/:id', (req, res) => {
      const actualPage = '/users/profile';
      const queryParams = { userId: req.params.id, hello: 'hey' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> ready on port http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
