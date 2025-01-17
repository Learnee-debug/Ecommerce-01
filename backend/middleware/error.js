const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if(err.name === 'castError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }

    //Duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate key${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(400, message);
    }

    //wrong jsonwebtoken
    if(err.name === 'JsonWebTokenError') {
        const message = 'your url is invalid try again!';
        err = new ErrorHandler(400, message);
    }

    //jwt expired
    if(err.name === 'TokenExpiredError') {
        const message = 'url expired!';
        err = new ErrorHandler(400, message);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message,

    });
}