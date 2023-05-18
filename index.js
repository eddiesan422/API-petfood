const express = require("express");
const { mongoose } = require("./database");

const app = express();

//SETTINGS
app.set("port", process.env.PORT || 3000);

//MIDDLEWARES:
app.use(express.json());

//ROUTES:
app.use("/api/users", require("./routes/user.routes"));

app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
