const express = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router();

router.post("/signup", authController.signup);
router.post('/login', authController.login);

// router
//     .route('/')
//     .get(authController.restrictTo('ADMIN'), userController.getAllUsers)
//     .post(userController.createUser)
//     .put(authController.restrictTo('ADMIN'), userController.updateUser)
//     .delete(authController.restrictTo('ADMIN'), userController.deleteUser)

// router
//     .route('/:id')
//     .get(authController.restrictTo('ADMIN'), userController.getUser)
//     .delete(authController.restrictTo('ADMIN'), userController.deleteUser);

// I'm keeping this as a reference.
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

module.exports = router;
