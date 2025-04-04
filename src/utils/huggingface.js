const axios = require('axios');

/**
 * Generates an image using Hugging Face's Diffusion Models API
 * @param {string} prompt - The text prompt for image generation
 * @param {string} model - The model ID to use (defaults to stabilityai/stable-diffusion-2)
 * @returns {Promise<string>} - URL of the generated image
 */
const generateImage = async (prompt, model = 'stabilityai/stable-diffusion-3.5-large') => {
  try {
    const response = await axios({
      url: `https://api-inference.huggingface.co/models/${model}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true
        }
      }),
      responseType: 'arraybuffer',
    });
    
    // Convert the image buffer to base64
    const base64Image = Buffer.from(response.data).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    return imageUrl;
  } catch (error) {
    console.error('Error generating image with Hugging Face:', error.message);
    throw new Error('Failed to generate image with Hugging Face');
  }
};

module.exports = { generateImage };