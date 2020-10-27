import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

let time_out = 10000;

chai.use(chaiHttp);
chai.should();

describe("GET /", () => {
    it("Retrieves index", (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    }).timeout(time_out);
});

describe("GET /api/contacts", () => {
    it("Returns all contacts", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    }).timeout(time_out);
});
