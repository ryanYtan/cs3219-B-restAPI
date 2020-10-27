let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./routes/api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});

var db = mongoose.connection;

if (!db) {
    console.log("[ERROR] Connecting to DB failed")
} else {
    console.log("[LOG] Connected to DB successful")
}

var port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('CS3219 Task B: AddressBook')
});

app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log("Running CS3219 Task B AddressBook on port " + port);
});

module.exports = app;
