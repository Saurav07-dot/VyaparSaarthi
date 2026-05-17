const express = require("express");

const mongoose = require("mongoose");

const path=require("path");

const cors = require("cors");

const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

const aiRoutes = require("./routes/aiRoutes");

const recommendationRoutes = require("./routes/recommendationRoutes");
dotenv.config();

const insightRoutes = require("./routes/insightRoutes");

const aiStudioRoutes = require("./routes/aiStudioRoutes");
const app = express();

const voiceRoutes = require("./routes/voiceRoutes");

// middleware
app.use(cors());

app.use(express.json());


// connect mongodb
mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {
  console.log(
    "MongoDB Connected"
  );
})
.catch((err) => {
  console.log(err);
});


// routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);
app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/ai",
  aiRoutes
);
app.use(
  "/api/recommendations",
  recommendationRoutes
);
app.use(
  "/api/insights",
  insightRoutes
);
app.use(
  "/api/ai-studio",
  aiStudioRoutes
);
app.use(
  "/api/voice",
  voiceRoutes
);
app.use(

"/uploads",

express.static(

path.join(

__dirname,

"uploads"

)
)
);
// test route
app.get("/", (req, res) => {
  res.send("API Running");
});


const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});