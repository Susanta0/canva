const designTipModel = require("../models/designTipModel");
const savedTipModel = require("../models/savedTipModel");
const designModel = require("../models/designModel");
const { generateImage } = require("../utils/openai");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const designTipController = {
  // Get all design tips
  async getDesignTips(req, res) {
    try {
      const tips = await designTipModel.find({ approved: true }).sort({ createdAt: -1 });
      return res.status(200).json({ tips });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get personalized design tips based on user's design history
  async getPersonalizedTips(req, res) {
    const { _id } = req.userInfo;
    try {
      // Get user's recent designs to analyze their style and preferences
      const userDesigns = await designModel.find({ user_id: _id }).sort({ updatedAt: -1 }).limit(5);
      
      if (userDesigns.length === 0) {
        // If user has no designs, return general tips
        const generalTips = await designTipModel.find({ approved: true }).sort({ averageRating: -1 }).limit(3);
        return res.status(200).json({ tips: generalTips, isPersonalized: false });
      }

      // Extract design components to analyze user's style
      let designElements = [];
      userDesigns.forEach(design => {
        if (design.components && design.components.length > 0) {
          designElements = [...designElements, ...design.components];
        }
      });

      // Use OpenAI to generate personalized tips based on user's design patterns
      if (designElements.length > 0) {
        const prompt = `Based on these design elements: ${JSON.stringify(designElements).substring(0, 500)}... 
        Generate 1 personalized design tip that would help improve this user's design skills. 
        Format the response as a JSON object with fields: category, tip, and link.`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        });

        const aiResponse = completion.choices[0].message.content;
        let tipData;
        
        try {
          tipData = JSON.parse(aiResponse);
        } catch (e) {
          // If parsing fails, create a default structure
          tipData = {
            category: "AI Suggestion",
            tip: aiResponse.substring(0, 200),
            link: "#ai-tips"
          };
        }

        // Save the AI-generated tip to the database
        const newTip = await designTipModel.create({
          category: tipData.category,
          tip: tipData.tip,
          link: tipData.link || "#ai-tips",
          isAIGenerated: true,
          approved: true
        });

        // Get some regular tips as well
        const regularTips = await designTipModel.find({ 
          approved: true,
          isAIGenerated: false
        }).sort({ averageRating: -1 }).limit(2);

        return res.status(200).json({ 
          tips: [newTip, ...regularTips],
          isPersonalized: true 
        });
      } else {
        // Fallback to regular tips if we can't extract design elements
        const regularTips = await designTipModel.find({ approved: true }).sort({ averageRating: -1 }).limit(3);
        return res.status(200).json({ tips: regularTips, isPersonalized: false });
      }
    } catch (error) {
      console.error("Error generating personalized tips:", error);
      // Fallback to regular tips in case of error
      const regularTips = await designTipModel.find({ approved: true }).sort({ averageRating: -1 }).limit(3);
      return res.status(200).json({ tips: regularTips, isPersonalized: false, error: error.message });
    }
  },

  // Save a tip for a user
  async saveTip(req, res) {
    const { _id } = req.userInfo;
    const { tip_id } = req.body;

    try {
      // Check if tip exists
      const tipExists = await designTipModel.findById(tip_id);
      if (!tipExists) {
        return res.status(404).json({ message: "Tip not found" });
      }

      // Check if already saved
      const alreadySaved = await savedTipModel.findOne({ user_id: _id, tip_id });
      
      if (alreadySaved) {
        // If already saved, remove it (toggle functionality)
        await savedTipModel.findByIdAndDelete(alreadySaved._id);
        return res.status(200).json({ message: "Tip unsaved successfully", saved: false });
      }

      // Save the tip
      await savedTipModel.create({ user_id: _id, tip_id });
      return res.status(201).json({ message: "Tip saved successfully", saved: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get user's saved tips
  async getSavedTips(req, res) {
    const { _id } = req.userInfo;
    try {
      const savedTips = await savedTipModel.find({ user_id: _id }).populate('tip_id');
      const tips = savedTips.map(item => item.tip_id);
      return res.status(200).json({ tips });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Rate a design tip
  async rateTip(req, res) {
    const { _id } = req.userInfo;
    const { tip_id, rating } = req.body;

    if (!tip_id || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid tip ID or rating" });
    }

    try {
      // Find the tip
      const tip = await designTipModel.findById(tip_id);
      if (!tip) {
        return res.status(404).json({ message: "Tip not found" });
      }

      // Check if user has already rated this tip
      const existingRatingIndex = tip.ratings.findIndex(
        r => r.user_id.toString() === _id.toString()
      );

      if (existingRatingIndex !== -1) {
        // Update existing rating
        tip.ratings[existingRatingIndex].rating = rating;
      } else {
        // Add new rating
        tip.ratings.push({ user_id: _id, rating });
      }

      // Calculate average rating
      const totalRating = tip.ratings.reduce((sum, r) => sum + r.rating, 0);
      tip.averageRating = totalRating / tip.ratings.length;

      await tip.save();

      return res.status(200).json({ 
        message: "Rating submitted successfully", 
        averageRating: tip.averageRating 
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Submit a new tip (from users)
  async submitTip(req, res) {
    const { _id } = req.userInfo;
    const { category, tip, link } = req.body;

    if (!category || !tip) {
      return res.status(400).json({ message: "Category and tip content are required" });
    }

    try {
      const newTip = await designTipModel.create({
        category,
        tip,
        link: link || "#",
        submittedBy: _id,
        approved: false // User-submitted tips need approval
      });

      return res.status(201).json({ 
        message: "Tip submitted successfully and pending approval",
        tip: newTip
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Admin: Approve a tip
  async approveTip(req, res) {
    const { tip_id } = req.params;

    try {
      const tip = await designTipModel.findByIdAndUpdate(
        tip_id, 
        { approved: true },
        { new: true }
      );

      if (!tip) {
        return res.status(404).json({ message: "Tip not found" });
      }

      return res.status(200).json({ message: "Tip approved successfully", tip });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = designTipController;