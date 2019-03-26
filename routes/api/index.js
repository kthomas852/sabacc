const router = require("express").Router();
const userRoutes = require("./users");
const tableRoutes = require("./table");
const topRoutes = require("./top")

// Book routes
router.use("/user", userRoutes);
router.use("/table", tableRoutes);
router.use("/top", topRoutes);

module.exports = router;
