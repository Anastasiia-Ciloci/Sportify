const express = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router();

router.post("/signup", authController.signup);
router.post('/login', authController.login);

// router.post("/forgotPassword", auth.forgotPassword);
// router.patch("/resetPassword/:token", auth.resetPassword);
// router.patch("/updateMyPassword", auth.protect, auth.updatePassword);
//
// router.get("/me", auth.protect, controller.getMe, controller.getUser);
// router.patch("/updateMe", auth.protect, controller.updateMe);
// router.delete("/deleteMe", auth.protect, controller.deleteMe);

router
    .route('/')
    .get(authController.protect, authController.restrictTo('ADMIN'), userController.getAllUsers)
    .post(authController.protect, authController.restrictTo('ADMIN'), userController.createUser)
    .put(authController.protect, authController.restrictTo('ADMIN'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('ADMIN'), userController.deleteUser)

router
    .route('/:id')
    .get(authController.protect, authController.restrictTo('ADMIN'), userController.getUser)
    .delete(authController.protect, authController.restrictTo('ADMIN'), userController.deleteUser);

// I'm keeping this as a reference.
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

module.exports = router;
