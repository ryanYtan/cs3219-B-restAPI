import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";
import { schema } from '../model/personModel';
let mongoose = require("mongoose");
let Person = require("../model/personModel");

chai.use(chaiHttp);
let should = chai.should();
let time_out = 10000;

const Person_JohnDoe = {
    userName: "jdoe",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example",
    phone: 12345678
};

const Person_MalloryWhack = {
    userName: "mallory",
    firstName: "Mallory",
    lastName: "Whack",
    email: "malwhack@example",
    phone: 23456789
};

describe("api", () => {

    // Empty the database before every test
    beforeEach((done) => {
        Person.remove({}, err => done());
    });

    describe("GET root", () => {
        it("Status Code: 200", (done) => {
            chai.request(app)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("GET non-existent person", () => {
        it("Status COde: 422", (done) => {
            let schema = new Person();
            schema.save((err, book) => {
                chai.request(app)
                    .get("/api/persons/nonexistent")
                    .end((err2, res) => {
                        res.should.have.status(422);
                        done();
                    });
            });
        });
    });

    describe("GET exists person", () => {
        it("Status Code: 200", (done) => {
            let schema = new Person(Person_JohnDoe);
            schema.save((err, person) => {
                chai.request(app)
                    .get("/api/persons/" + Person_JohnDoe.userName)
                    .end((err2, res) => {
                        res.should.have.status(200);
                        res.body.data.should.have.property("userName");
                        res.body.data.should.have.property("firstName");
                        res.body.data.should.have.property("lastName");
                        res.body.data.should.have.property("phone");
                        res.body.data.should.have.property("email");
                        done();
                    });
            });
        });
    })

    describe("POST good data", () => {
        it("Status Code: 200", (done) => {
            chai.request(app)
                .post("/api/persons")
                .send(Person_JohnDoe)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("POST bad data", () => {
        it("Status Code: 400", (done) => {
            let Person_JohnDoe_Modified = JSON.parse(JSON.stringify(Person_JohnDoe));
            Person_JohnDoe_Modified.userName = "with spaces";
            chai.request(app)
                .post("/api/persons")
                .send(Person_JohnDoe_Modified)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("PUT exists", () => {
        let schema = new Person(Person_JohnDoe);
        let editedPerson = {
            userName: Person_JohnDoe.userName,
            firstName: "as",
            lastName: "d",
            email: "sdfasdf",
            phone: 12345678
        }
        it("Status Code: 200", (done) => {
            schema.save((err, person) => {
                chai.request(app)
                    .put("/api/persons/" + editedPerson.userName)
                    .send(editedPerson)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe("PUT does not exists", () => {
        let schema = new Person(Person_JohnDoe);
        let editedPerson = {
            userName: "notexist",
            firstName: "as",
            lastName: "d",
            email: "sdfasdf",
            phone: 12345678
        }
        it("Status Code: 422", (done) => {
            schema.save((err, person) => {
                chai.request(app)
                    .put("/api/persons/" + editedPerson.userName)
                    .send(editedPerson)
                    .end((err, res) => {
                        res.should.have.status(422);
                        done();
                    });
            });
        });
    });

    describe("DELETE exists", () => {
        let schema = new Person(Person_JohnDoe);
        it("Status Code: 200", (done) => {
            schema.save((err, person) => {
                chai.request(app)
                    .delete("/api/persons/" + Person_JohnDoe.userName)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe("DELETE does not exist", () => {
        let schema = new Person();
        it("Status Code: 422", (done) => {
            schema.save((err, person) => {
                chai.request(app)
                    .delete("/api/persons/" + Person_JohnDoe.userName)
                    .end((err, res) => {
                        res.should.have.status(422);
                        done();
                    });
            });
        });
    });
});
