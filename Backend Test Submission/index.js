const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const shorturlRoutes = require("./routes/shorturl");
app.use("/api", shorturlRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
