const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./src/config/db");

dotenv.config();
app.use(express.json());

if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "https://canva-buht.onrender.com",
      credentials: true,
    })
  );
}

app.use("/api", require("./src/routes/authRoutes"));
app.use("/api", require("./src/routes/designRoutes"));
app.use("/api", require("./src/routes/openaiRoutes"));
app.use("/api", require("./src/routes/huggingFaceRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./", "frontend", "dist", "index.html")
    );
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
