const router = require("express").Router();
const userController = require("../../controllers/UserController");

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .put(userController.findOne)
  .post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/:email")
  .get(userController.findOne)
  .put(userController.findOne)
  .delete(userController.remove);

module.exports = router;
