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
router.post("/add_user_image", auth, designController.addUserImage);
router.get("/get_user_image", auth, designController.getUserImage);

router.get("/design_images", auth, designController.getDesignImages);
router.get("/background_images", auth, designController.getBackgroundImages);

router.get("/user_design", auth, designController.getUserDesigns);

router.delete(
  "/delete_user_image/:design_id",
  auth,
  designController.deleteUserDesigns
);

router.get("/templates", auth, designController.getTempaltes);

router.get(
  "/add_user_templates/:template_id",
  auth,
  designController.addUserTemplate
);

module.exports = router;
