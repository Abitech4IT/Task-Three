const express = require("express");

const employeeRoute = require("./routes/employeeRoute");

const app = express();

app.use(express.json());

//Routes
app.use("/api/v1/employees", employeeRoute);

app.all("*", (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server!`, 404);

  res.status(404).json({
    success: false,
    message: "page not found",
  });
});

module.exports = app;
