let bodyParser = require("body-parser");
let express = require("express");
let { connect, connection } = require("mongoose");
let app = express();
let routes = require("./routes/routes");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

connect("mongodb://localhost/cs3219TaskB", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
let db = connection;

let port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("CS3219 Task B"));

app.use("/api", routes);
app.listen(port, () => { console.log("Running on port " + port); });

module.exports = app;
