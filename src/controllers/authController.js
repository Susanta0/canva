const userModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
  async register(req, res) {
    const { name, email, password } = req.body;
    // name = name.trim();
    // email = email.trim();
    // password = password.trim();
    try {
      const getUser = await userModel.findOne({ email }).select("+password");
      if (getUser) {
        return res.status(404).json({ message: "Email already exit" });
      } else {
        const user = await userModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 5),
        });
        const token = await jwt.sign(
          {
            name: user.name,
            email: user.email,
            _id: user.id,
          },
          "susanta",
          {
            expiresIn: "2d",
          }
        );

        return res.status(201).json({ message: "Signup success", token });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error", token });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email }).select("+password");
      if (user) {
        const matchPas = await bcrypt.compare(password, user.password);
        if (matchPas) {
          const token = await jwt.sign(
            {
              name: user.name,
              email: user.email,
              _id: user.id,
            },
            "susanta",
            {
              expiresIn: "2d",
            }
          );

          return res.status(200).json({ message: "Signin success", token });
        } else {
          return res.status(404).json({ message: "Password invalid" });
        }
      } else {
        return res.status(404).json({ message: "Email does't exit" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error", token });
    }
  },
};

module.exports = authController;
