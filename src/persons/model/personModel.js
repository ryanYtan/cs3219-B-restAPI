import { model, Schema } from "mongoose";

// define schema
const personSchema = new Schema({
    userName:   { String, required: true },
    firstName:  { String, required: true },
    lastName:   { String, required: true },
    email:      { String, required: true },
    phone:      { String }
});

const Person = model("Person", personSchema);

// Define CRUD operations on Person
export function createPerson(personData) {
    const person = new Person(personData);
    return person.save();
}

exports.findByUserName = (userName) => {
    return Person.find({userName: userName});
};

exports.updatePerson = (userName, personData) => {
    return Person.findOneAndUpdate({ userName: userName}, personData);
};

exports.deletePerson = (userName) => {
    return Person.findOneAndRemove({ userName: userName });
};
