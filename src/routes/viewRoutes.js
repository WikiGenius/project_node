const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.isLogin);

router.get('/login', viewController.getLogin);
router.get('/signup', viewController.getSignup);
router.get('/logout', viewController.getLogout);

router.get('/me', authController.protect, viewController.getMe);
router.get('/', viewController.getOverview);
router.get('/tour/:tourSlug', viewController.getTour);

module.exports = router;
