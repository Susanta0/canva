const designController = require("../controllers/designController");
const auth = require("../middlewares/middleware");

const router = require("express").Router();
router.post("/create_user_design", auth, designController.createUserDesign);
router.get("/user_design/:design_id", auth, designController.getUserDesign);
router.put(
  "/update_user_design/:design_id",
  auth,
  designController.updateUserDesign
);

module.exports = router;
