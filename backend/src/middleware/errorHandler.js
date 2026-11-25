function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode || 500;
  let code = error.code || 'INTERNAL_SERVER_ERROR';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
  } else if (error.code === 11000) {
    statusCode = 409;
    code = 'DUPLICATE_RESOURCE';
  }

  const response = {
    ok: false,
    error: {
      code,
      message: statusCode === 500 ? 'An unexpected server error occurred' : error.message
    }
  };

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    response.error.details = error.message;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
