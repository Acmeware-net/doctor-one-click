const notFound = (req: any, res: any, next: any) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.log(`Inside error handler line 8`)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  console.log(`Inside error handler line 11`)
  // If Mongoose not found error, set to 404 and change message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }
  console.log(`Inside error handler line 17`)
  if(process.env.NODE_ENV === 'development'){
    console.log(err.stack);
  }
  console.log(`Inside error handler line 21`)
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
