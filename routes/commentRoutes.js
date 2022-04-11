const express = require('express');
const commentController = require('../controllers/commentController')
const authController = require('../controllers/authController')


const router = express.Router()

router
    .route('/')
    .get(authController.isLoggedIn, commentController.getAllComments)
    .post(authController.isLoggedIn, commentController.createComment)

router
    .route('/:id')
    .get(authController.isLoggedIn, commentController.getComment)
    .put(authController.isLoggedIn, commentController.updateComment)
    .delete(authController.isLoggedIn, commentController.updateComment)

module.exports = router;