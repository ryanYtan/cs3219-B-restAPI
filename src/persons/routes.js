let router = require("express").Router();
import { index, insert, update, remove } from "./controllers/personController";

router.get("/", function (req, res) {
    res.json({
        status: "API is working",
        message: "This is located at IP:PORT/api/",
    });
});

router.route("/persons")
    .get(index)
    .post(insert);

router.route("/persons/:user_name")
    .get()
    .patch(update)
    .put(update)
    .delete(remove);

export default router;
