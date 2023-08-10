import path from 'path';
import createError from 'http-errors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from "compression";
import helmet from "helmet";

import { dbConnect } from './utils/db';
import indexRouter from './routes/index.router';
import messageRouter from './routes/message.router'
import errorHandler from './utils/error-handler';


class Server {
  private exp_app: Application;
  private port: string;

  constructor() {
    this.exp_app = express();
    this.port = this.normalizePort(process.env.PORT || '3000');
    this.exp_app.set('port', this.port);

    // support reverse proxies for render.com deployments
    if('RENDER' in process.env && process.env.NODE_ENV === 'production') { 
      this.exp_app.set('trust proxy', 3);
    }

    this.connectToDB();
    this.setupViewEngine();
    this.connectMiddlewares();
    this.connectRoutes();
  }

  private normalizePort(val: any) {
    var port = parseInt(val, 10);
    return isNaN(port) ? val : (port >= 0) ? port : false;
  }

  private async connectToDB() {
    try {
      await dbConnect();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  private setupViewEngine() {
    this.exp_app.set('views', path.join(__dirname + '/../src', 'views')); // path also supports dist
    this.exp_app.set('view engine', 'pug')
  }

  private connectMiddlewares() {
    // Set up rate limiter: maximum of 10 requests per minute
    const RateLimit = require("express-rate-limit");
    const limiter = RateLimit({
      windowMs: 1 * 10 * 1000, // 10 seconds
      max: 10,
    });

    // Apply rate limiter to all requests
    this.exp_app.use(limiter);

    this.exp_app.use(logger('dev'));
    this.exp_app.use(express.json());
    this.exp_app.use(express.urlencoded({ extended: false }));
    this.exp_app.use(cookieParser());
    this.exp_app.use(helmet());
    this.exp_app.use(compression());
  }

  private connectRoutes() {
    // static files
    this.exp_app.use(express.static(path.join(__dirname, './../public')));

    // dynamic routes
    this.exp_app.use('/', indexRouter);
    this.exp_app.use('/new', messageRouter);

    // catch 404 and forward to error handler
    this.exp_app.use((req, res, next) => next(createError(404)));

    // custom error handler
    this.exp_app.use(errorHandler);
  }

  listen() {
    this.exp_app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    this.exp_app.on('error', this.onError);
  }

  private onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}

export default Server;