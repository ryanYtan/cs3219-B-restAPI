let Person = require("../model/personModel")

exports.insert = (req, res) => {
    let person = new Person();
    let name = req.body.userName;
    person.userName = req.body.userName;
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.email = req.body.email;
    person.phone = req.body.phone;
    person.save((err) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json({ message: "[Success] INSERT: " + name, data: person });
    });
};

exports.index = (req, res) => {
    Person.get((err, persons) => {
        if (err)
            res.status(400).json({ message: err });
        else
            res.status(200).json({ message: "[Success] GET_ALL", data: persons });
    });
};

exports.view = (req, res) => {
    let name = req.params.user_name;
    Person.findOne({ userName: name }, (err, person) => {
        if (err)
            res.status(400).send(err);
        else if (!person)
            res.status(422).json({
                message: `[Failure] GET: No such user (${name}) exists`
            });
        else
            res.status(200).json({ message: "[Success] GET: " + name, data: person });
    })
};

exports.update = (req, res) => {
    const name = req.params.user_name;
    const query = { "userName": name };
    const update = {
        "$set": {
            "userName": req.body.userName ? req.body.userName : person.userName,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "phone": req.body.phone
        }
    };

    Person.updateOne(query, update)
        .then((result) => {
            if (result["nModified"] == 0)
                res.status(422).json({ message: `[Failure] UPDATE: No such user (${name}) exists` });
            else
                res.status(200).json({
                    message: "[Success] UPDATE: " + name,
                    data: req.body
                })
        })
        .catch((err) => res.status(400).json(err));
};

exports.remove = (req, res) => {
    const name = req.params.user_name;
    Person.remove({ "userName": name }, (err, result) => {
        if (err)
            res.status(400)>send(err)
        else if (result.deletedCount == 0)
            res.status(422).json({ message: `[Failure] DELETE: No such user (${name}) exists` });
        else
            res.status(200).json({
                message: "[Success] DELETE: " + name,
            })
    });
};
