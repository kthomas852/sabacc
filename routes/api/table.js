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
    .get(tableController.cardDraw)
    .post(tableController.shuffleDeck)
    .put(tableController.findOne)
    .delete(tableController.remove);

module.exports = router;