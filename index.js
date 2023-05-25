const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const {mongoose} = require("./database");

const app = express();

// SETTINGS
app.set("port", process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/users", require("./routes/user.routes"));


app.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"));
});
