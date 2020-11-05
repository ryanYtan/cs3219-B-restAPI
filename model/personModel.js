let mongoose = require('mongoose');

// define schema
const personSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]*$/.test(v);
            },
            message: props => `${props.value} must follow the pattern "[a-zA-Z0-9]"`
        },
        required: [true, "User name required"]
    },
    firstName: {
        type: String,
        required: [true, "First name required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name required"]
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },
    phone: { type: String }
});

const Person = module.exports = mongoose.model("Person", personSchema);

module.exports.get = function(callback, limit) {
    Person.find(callback).limit(limit);
}
