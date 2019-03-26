const router = require("express").Router();
const TopController = require("../../controllers/TopController");

// Matches with "/api/top"
router.route("/")
  .get(TopController.findAll)
  
module.exports = router;