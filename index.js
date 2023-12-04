const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./connection");
const { contactRouter } = require("./routes/contact.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/contacts", contactRouter);

app.get("/", (req, res) => {
  res.send({ message: "Server Tested OK" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("Server connected to DB");
    console.log(`Server is running at PORT ${PORT}`);
  } catch (err) {
    console.log("Error in connecting to DB");
    console.log(err);
  }
});

module.exports = { app };
