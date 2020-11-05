let bodyParser = require("body-parser");
let express = require("express");
let { connect, connection } = require("mongoose");
let app = express();
let routes = require("./routes/routes");
let cors = require("cors");
let serverless = require("serverless-http");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("CS3219 Task B"));
app.use("/api", routes);

let port = process.env.PORT || 8080;

connect(
    `mongodb+srv://1234:1234@cluster0.dmjrj.mongodb.net/taskb3?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        user: '1234',
        pass: '1234',
    }
)
.then(() => {
    console.log("[Success]");
});

module.exports = app;
module.exports.handler = serverless(app);
