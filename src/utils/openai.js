const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (prompt) => {
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error.message);
    throw new Error("Failed to generate image");
  }
};

module.exports = { generateImage };
