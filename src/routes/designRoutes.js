const designController = require("../controllers/designController");
const auth = require("../middlewares/middleware");

const router = require("express").Router();
router.post("/create_user_design", auth, designController.createUserDesign);

module.exports = router;
