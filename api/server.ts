import express, { Express  } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8545;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setTimeout(1000 * 45, function () {
    res.status(408).send("Request has timed out.");
  });
  next();
});

var routes = require("./routes/APIRoutes");

routes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
