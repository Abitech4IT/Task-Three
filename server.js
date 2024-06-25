require("dotenv").config({ path: `${process.cwd()}/.env` });

const app = require("./app");
const dotenv = require("dotenv");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exception");
});

//config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   dotenv.config({
//     path: "./.env",
//   });
// }

//Starting Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}...`);
});

//unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandle promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
