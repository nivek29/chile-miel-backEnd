const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error');
const RouteNotFound = require('./errors/routeNotFound');
const routes = require('./routes');

require('./config/database');

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.middleware();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: false, limit: '50mb' }));
    //security
    this.app.use(helmet());
    this.app.use(xss());
    this.app.use(mongoSanitize());
    this.app.use(hpp());
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(routes);

    this.app.use((req, res, next) => next(new RouteNotFound()));

    this.app.use(errorMiddleware);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`[Server]: Running at http://localhost:${this.port}...`);
    });
  }
}

if (module === require.main) {
  new App().listen();
}

module.exports = new App().app;
