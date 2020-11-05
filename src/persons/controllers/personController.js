let PersonModel = require("../model/personModel")

exports.insert = (req, res) => {
    let person = new Person();
    person.userName = req.body.userName;
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.email = req.body.email;
    person.phone = req.body.phone;
    person.save((err) => {
        if (err)    res.json(err);
        else        res.json({ message: "[Success] INSERT", data: person });
    });
};

exports.index = (req, res) => {
    Person.get((err, persons) => {
        if (err)
            res.json({ status: "Error", message: err })
        else
            res.json({ message: "[Success] GET_ALL", data: persons });
    });
};

exports.get = (req, res) => {
    Person.findById(req.params.userName, (err, person) => {
        if (err)    res.json(err)
        else        res.json({ message: "[Success] GET", data: person })
    });
};

exports.update = (req, res) => {
    Person.findById(req.params.userName, (err, person) => {
        if (err)    res.json(err);
        person.userName = req.body.userName ? req.body.userName : person.userName;
        person.firstName = req.body.firstName;
        person.lastName = req.body.lastName;
        person.email = req.body.email;
        person.phone = req.body.phone;
        person.save((err) => {
            if (err)    res.json(err)
            else        res.json({ message: "[Success] UPDATE", data: person })
        });
    });
};

exports.remove = (req, res) => {
    let obj = { userName: req.params.userName }
    Person.remove(obj, (err, person) => {
        if (err)    res.send(err)
        else        res.json({ message: "[Success] DELETE", body: person })
    });
};
