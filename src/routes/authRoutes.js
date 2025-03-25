const authController = require("../controllers/authController");

const router = require("express").Router();
router.post("/user_register", authController.register);

module.exports = router;
