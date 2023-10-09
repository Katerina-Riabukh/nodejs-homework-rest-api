const express = require("express");
const logger = require("morgan");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./environments/production.env"
      : "./environments/development.env",
});

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Mongo db connection ======
mongoose
  .connect(process.env.MONGO_DB)
  .then((con) => {
    console.log("Mongo DB soccessfully connented");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
