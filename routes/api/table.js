const router = require("express").Router();
const tableController = require("../../controllers/TableController")

// Matches with "/api/table"
router.route("/")
  .get(tableController.findAll)
  .put(tableController.findOne)
  .post(tableController.create);

  // Matches with "/api/table/:id"
router
    .route("/:id")
    .get(tableController.findOne)
    .post(tableController.shuffleDeck)
    .put(tableController.update)
    .delete(tableController.remove);

module.exports = router;