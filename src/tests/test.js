import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

let time_out = 10000;

const dummy_person = {
    _id: "123",
    name: "John I'm Done",
    email: "johnisdone@example.com",
    phone: "12345678",
    address: "Mariana Trench"
}

const dummy_person_edited = {
    _id: "123",
    name: "John I'm Done The Second",
    email: "johnisdonethesecond@example.com",
    phone: "87654321",
    address: "Spur Line"
}

chai.use(chaiHttp);
chai.should();

describe("GET /", () => {
    it("Retrieves index", (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    }).timeout(time_out);
});

describe("GET /api/contacts", () => {
    it("Returns all contacts", (done) => {
        chai.request(app)
            .get("/api/contacts")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    }).timeout(time_out);
});

describe("POST /api/contacts", () => {
    it("Inserts a contact", (done) => {
        chai.request(app)
            .post("/api/contacts")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(dummy_person)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            })
    }).timeout(time_out);

    it("Insert a blank contact", (done) => {
        chai.request(app)
            .post("/api/contacts")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({}) // empty
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            })
    }).timeout(time_out);
});
