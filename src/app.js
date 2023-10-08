const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const customMiddlewares = require('./middlewares/customMiddlewares');
const handleUndefinedRoutes = require('./middlewares/handleUndefinedRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // 'combined' is one of the predefined formats
}
app.use(helmet());
app.use(express.json());
app.use(express.static('./public'));

app.use(customMiddlewares.requestTimeMiddleware);


app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

// Middleware to handle undefined routes
app.use('*', handleUndefinedRoutes);

app.use(errorMiddleware);

module.exports = app;
