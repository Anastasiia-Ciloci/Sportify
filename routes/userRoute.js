const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

// router.post('/signup')
// router.post('/login')

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
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
