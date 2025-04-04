const { generateImage } = require("../utils/huggingface");

const huggingFaceController = {
  async generateImage(req, res) {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      // Use the model parameter if provided, otherwise use default
      const imageUrl = await generateImage(prompt, model);
      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = huggingFaceController;