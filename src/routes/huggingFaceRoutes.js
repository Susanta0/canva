const express = require("express");
const huggingFaceController = require("../controllers/huggingFaceController");
const router = express.Router();

router.post("/huggingface/generate-image", huggingFaceController.generateImage);

module.exports = router;