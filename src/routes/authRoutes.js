const authController = require("../controllers/authController");

const router = require("express").Router();
router.post("/user_register", authController.register);
router.post("/user_login", authController.login);

router.get("/google_login", authController.googleLogin);

module.exports = router;
