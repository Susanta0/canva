const { generateImage } = require("../utils/openai");

const openAiController = {
  async openAi(req, res) {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const imageUrl = await generateImage(prompt);
      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = openAiController;
