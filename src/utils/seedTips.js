const mongoose = require('mongoose');
const dotenv = require('dotenv');
const designTipModel = require('../models/designTipModel');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB for seeding tips'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initial design tips data
const initialTips = [
  {
    category: "Design Basics",
    tip: "Use a maximum of 2-3 fonts in your design to maintain visual harmony.",
    link: "#typography",
    approved: true
  },
  {
    category: "Color Theory",
    tip: "Create depth in your designs by using lighter colors for background elements and darker colors for foreground elements.",
    link: "#colors",
    approved: true
  },
  {
    category: "Layout",
    tip: "Apply the rule of thirds by placing key elements along the lines or at the intersections of a 3×3 grid.",
    link: "#layout",
    approved: true
  },
  {
    category: "Advanced Techniques",
    tip: "Use shadows sparingly to create subtle depth without overwhelming your design.",
    link: "#effects",
    approved: true
  },
  {
    category: "Trending Styles",
    tip: "Try glassmorphism for a modern UI look with frosted glass effects.",
    link: "#trends",
    approved: true
  },
  {
    category: "Productivity",
    tip: "Save frequently used elements as templates to speed up your design workflow.",
    link: "#templates",
    approved: true
  },
  {
    category: "Image Editing",
    tip: "Maintain consistent filter styles across all images in your project for a cohesive look.",
    link: "#images",
    approved: true
  },
  {
    category: "Typography",
    tip: "Pair a serif font with a sans-serif font to create visual contrast and hierarchy in your designs.",
    link: "#typography",
    approved: true
  },
  {
    category: "Color Theory",
    tip: "Use the 60-30-10 rule: 60% dominant color, 30% secondary color, and 10% accent color.",
    link: "#colors",
    approved: true
  },
  {
    category: "Accessibility",
    tip: "Ensure text has sufficient contrast with its background for better readability (WCAG recommends at least 4.5:1 for normal text).",
    link: "#accessibility",
    approved: true
  },
  {
    category: "Composition",
    tip: "Create visual balance by distributing the visual weight of objects, colors, and space evenly.",
    link: "#composition",
    approved: true
  },
  {
    category: "Branding",
    tip: "Maintain consistent brand elements (colors, fonts, logo usage) across all your designs for stronger brand recognition.",
    link: "#branding",
    approved: true
  }
];

// Seed function
async function seedTips() {
  try {
    // Check if tips already exist
    const existingTipsCount = await designTipModel.countDocuments();
    
    if (existingTipsCount > 0) {
      console.log(`Database already has ${existingTipsCount} tips. Skipping seed.`);
      process.exit(0);
    }
    
    // Insert tips
    await designTipModel.insertMany(initialTips);
    console.log(`Successfully seeded ${initialTips.length} design tips!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tips:', error);
    process.exit(1);
  }
}

// Run the seed function
seedTips();