let Contact = require('../model/contactModel');

// Handle index actions
exports.index = (req, res) => {
    Contact.get((err, contacts) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Creates a new contact
exports.new = (req, res) => {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.address = req.body.address;
    console.log("to save");
    contact.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: 'New contact created!',
                data: contact
            });
        }
    });
};

// Gets contact from id
exports.view = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.update = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.address = req.body.address;
        contact.save((err) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    message: 'Contact Info updated',
                    data: contact
                });
            }
        });
    });
};

// Handle delete contact
exports.delete = (req, res) => {
    Contact.remove({
        _id: req.params.contact_id
    }, (err, contact) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "success",
                message: 'Contact deleted',
                body: contact
            });
        }
    });
};
