// there is a inbuilt class of Error in Node.js so we are just inheriting its properties

class ApiError extends Error {
  // creating a custom constructor
  constructor(
    statusCode,
    message = 'something went wrong',
    // there might be multiple errors not single
    errors = [],
    statck = ''
  ) {
    // this super is used to forcefully overwrite something
    super(message);
    this.statusCode = statusCode;
    (this.data = null),
      (this.message = message),
      (this.success = false),
      (this.errors = errors);

    // if stack is not empty

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
