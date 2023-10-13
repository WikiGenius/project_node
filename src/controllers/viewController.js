const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const formatDate = require('./../utils/formatDate');
const APIFeatures = require('./../utils/apiFeatures');

exports.getOverview = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(Tour.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const tours = await features.query;

  res.status(200).render('overview', {
    tours,
    formatDate: formatDate,
    title: 'All Tours'
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tourSlug = req.params.tourSlug;
  const popOptions = { path: 'reviews' };
  const tour = await Tour.findOne({ slug: tourSlug }).populate(popOptions);
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
  const MAPBOX_STYLE = process.env.MAPBOX_STYLE;
  res.status(200).render('tour', {
    tour,
    title: tour.name,
    MAPBOX_TOKEN,
    MAPBOX_STYLE
  });
});
exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Login' });
});
exports.getSignup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', { title: 'signup' });
});
exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).render('me', { title: 'Me' });
});
exports.getLogout = catchAsync(async (req, res, next) => {
  // Clear the authentication cookie/token
  res.clearCookie('jwt');

  // Redirect to home page or login page
  res.redirect('/');
});
