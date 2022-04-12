const express = require("express");
const workoutController = require("../controllers/workoutController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createWorkout);

router
  .route("/:slug")
  .get(authController.isLoggedIn, workoutController.getWorkout)
  .put(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

router.route("/link").put(workoutController.linkWorkout);

module.exports = router;
