const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRoutes");
const mongoose = require("mongoose");
const route = require("./router");

const port = 8900;

// Use CORS middleware to allow requests from your Vercel domain
app.use(cors({
  origin: "https://thirufrontend.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"], // specify the allowed HTTP methods
}));

app.use(express.json());

// Use your user router
app.use("/", userRouter);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Thiru2115:Thiru11222333344444@cluster0.woqafsk.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database Connected");
    // Start the server
    app.listen(port, () => {
      console.log("App Running");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Use your other routes
app.use("/", route);
