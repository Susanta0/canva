# Canva Project

## Description

This is a MERN (MongoDB, Express, React, Node.js) stack project named "Canva". It is designed to provide a platform for creating and managing designs. The project is structured to separate frontend and backend functionalities, ensuring scalability and maintainability.

## Deployment

The project is deployed on Render. You can access it using the following links:

- **Canva:** [https://canva-buht.onrender.com](https://canva-buht.onrender.com)

## Tech Stack

The project uses the following technologies:

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
- ![Google Auth](https://img.shields.io/badge/Google_Auth-4285F4?style=for-the-badge&logo=google&logoColor=white)
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-4A90E2?style=for-the-badge&logo=lock&logoColor=white)

## File Structure

```
Canva
  frontend/          # Contains the React frontend code
    dist/            # Build output directory
      assets/        # Compiled assets
        index-CBSu85X3.css # Compiled CSS file
        index-DrxjbRmg.js  # Compiled JavaScript file
      default_user.png # Default user image
      index.html     # Build HTML file
    node_modules/    # Dependencies for the frontend
    public/          # Static assets
      default_user.png # Default user image for public access
    src/             # Frontend source code
      components/    # React components
        Home/                # Subdirectory for Home-related components
          HomeItems.jsx      # Component for items in the Home section
        BackgroundImages.jsx # Component for background images
        CreateStructure.jsx  # Component for creating structures
        Element.jsx          # Component for individual elements
        Header.jsx           # Component for the header
        Home.jsx             # Main Home component
        Images.jsx           # Component for managing images
        InitialImages.jsx    # Component for initial images
        MyImages.jsx         # Component for user-uploaded images
        Projects.jsx         # Component for managing projects
        TemplateDesign.jsx   # Component for designing templates
        Templates.jsx        # Component for template management
      pages/         # React pages
        CreateDesign.jsx     # Page for creating a design
        Index.jsx            # Main index page
        Layout.jsx           # Layout page for structuring components
        Main.jsx             # Main page of the application
      utils/         # Utility functions
        api.js              # API utility functions
        index.js            # Utility index file
      App.css        # Styling for the App component
      App.jsx        # Main App component
      index.css      # Global CSS styles
      main.jsx       # Entry point for the React application
    .gitignore       # Files and directories to ignore in Git (frontend)
    eslint.config.js # ESLint configuration for the frontend
    index.html       # Main HTML file for the frontend
    package.json     # Frontend dependencies and scripts
    package-lock.json# Lock file for frontend dependencies
    vite.config.js   # Vite configuration file
  node_modules/      # Dependencies for the backend
  src/               # Backend source code
    config/          # Configuration files
      db.js          # Database connection configuration
    controllers/     # Controllers for handling requests
      authController.js     # Controller for authentication
      designController.js   # Controller for design-related operations
    middlewares/     # Middleware functions
      middleware.js          # General middleware functions
    models/          # Database models
      authModel.js           # Model for authentication
      backgroundImageModel.js# Model for background images
      designImageModel.js    # Model for design images
      designModel.js         # Model for designs
      templateModel.js       # Model for templates
      userImageModel.js      # Model for user-uploaded images
    routes/          # API routes
      authRoutes.js          # Routes for authentication
      designRoutes.js        # Routes for design-related operations
    utils/           # Utility functions for the backend
      googleConfig.js        # Google API configuration
  .env               # Environment variables
  .gitignore         # Files and directories to ignore in Git (backend)
  package.json       # Backend dependencies and scripts
  package-lock.json  # Lock file for backend dependencies
  README.md          # Project documentation
  server.js          # Entry point for the backend server
  vercel.json        # Configuration for deployment on Vercel
```

## Getting Started

1. Clone the repository.
2. Install dependencies for both frontend and backend.
3. Set up the `.env` file with the required environment variables.
4. Run the backend server using `node server.js`.
5. Navigate to the `frontend` directory and start the React development server.

## Contributing

We welcome contributions to the **Canva Project**! To contribute:

1. **Fork the Repository**: Click the "Fork" button on the top right of this repository to create a copy in your GitHub account.
2. **Clone the Repository**: Clone the forked repository to your local machine using:
   ```bash
   git clone https://github.com/your-username/canva.git
   ```
3. **Create a Branch**: Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
4. **Make Changes**: Implement your changes or fixes.
5. **Commit Changes**: Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add feature-name or Fix issue-description"
   ```
6. **Push Changes**: Push your changes to your forked repository:
   ```bash
   git push origin feature-name
   ```
7. **Create a Pull Request**: Open a pull request from your branch to the main repository's `main` branch. Provide a clear description of your changes.

### Guidelines

- Ensure your code follows the project's coding standards.
- Write clear and concise commit messages.
- Test your changes thoroughly before submitting a pull request.
- Be respectful and constructive in code reviews and discussions.

## Contact

For any queries or support, please contact the developer:

- **Name:** [Susanta Samanta]
- **Email:** [susanta721467@gmail.com]

---

## 🌟 Thank You for Visiting!

We hope you enjoy exploring and using the **Canva Project**. Your feedback and suggestions are always welcome! If you find this project helpful or inspiring, don't forget to give it a ⭐ on [GitHub](https://github.com/Susanta0/canva).

Happy Coding! 🚀
