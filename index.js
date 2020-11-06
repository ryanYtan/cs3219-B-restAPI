let bodyParser = require("body-parser");
let express = require("express");
let { connect, connection } = require("mongoose");
let app = express();
let routes = require("./routes/routes");
let cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

connect("mongodb://localhost/cs3219TaskB", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
let db = connection;

let port = 8081;

app.get("/", (req, res) => res.send("CS3219 Task B"));


app.use("/api", routes);
app.listen(port, () => { console.log("Running on port " + port); });

module.exports = app;
