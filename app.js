const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRoutes");
app.use(express.json());
app.use(cors());

const port = 8900;

app.use("/", userRouter);

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Thiru2115:Thiru11222333344444@cluster0.woqafsk.mongodb.net/",
    /* { useNewUrlParser: true, useUnifiedTopology: true } */
  )
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log("App Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const route = require("./router");
app.use("/", route);
