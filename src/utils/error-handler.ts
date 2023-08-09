import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);

  // set locals, only providing error in development
  const currEnv = process.env.NODE_ENV || req.app.get('env');
  res.locals.message = err.message;
  res.locals.error = currEnv === 'development' ? err : {};

  // render the error page
  res.render('error');
};

export default errorHandler;