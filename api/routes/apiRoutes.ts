module.exports = function (app: any) {
  var api = require("../controllers/apiControllers");
  app.post("/withdraw", api.withdraw);
};
