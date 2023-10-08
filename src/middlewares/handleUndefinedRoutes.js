const AppError = require('./../utils/appError'); // Adjust the path to where appError.js is located

module.exports = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
