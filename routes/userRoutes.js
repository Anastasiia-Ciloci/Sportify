const express = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router();

router.post("/signup", authController.signup);
// router.post('/login')

// router.post("/forgotPassword", auth.forgotPassword);
// router.patch("/resetPassword/:token", auth.resetPassword);
// router.patch("/updateMyPassword", auth.protect, auth.updatePassword);
//
// router.get("/me", auth.protect, controller.getMe, controller.getUser);
// router.patch("/updateMe", auth.protect, controller.updateMe);
// router.delete("/deleteMe", auth.protect, controller.deleteMe);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put()
    .delete()

router
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser);

// I'm keeping this as a reference.
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

module.exports = router;
