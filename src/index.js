import express from "express";
import { urlencoded, json } from "body-parser";
import { connect, connection } from "mongoose";
import apiRoutes from "../routes/api-routes";


// create app
const app = express();
const port = process.env.PORT || 8080;
app.use(json());

//const db = connection;
//connect("mongodb://localhost/resthub", { useNewUrlParser: true});

app.get("/", (req, res) => {
  res.send("CS3219 Task B")
});

app.use("/api", apiRoutes);
app.listen(process.env.PORT || 8080, () => {
    console.log("Running CS3219 Task B AddressBook on port " + port);
});

export default app;
