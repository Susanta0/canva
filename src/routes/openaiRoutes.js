const express = require("express");
const openAiController = require("../controllers/openAiController");
const router = express.Router();

router.post("/generate-image", openAiController.openAi);

module.exports = router;
