const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const app = require("./src/index.js");
chai.use(chaiHttp);

describe("API tests", () => {
  it("GET success", (done) => {
    chai
      .request(app)
      .get('/api/users')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.body.data);
        assert.isArray(res.body.data);
        done()
      });
  });

  it("GET success sortby ascending", (done) => {
    chai
      .request(app)
      .get('/api/users?sortBy=email&sortDirection=ascending')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.body.data);
        assert.isArray(res.body.data);
        assert.operator(res.body.data[0].email, '<', res.body.data[1].email);
        done()
      });
  });

  it("GET success sortby descending", (done) => {
    chai
      .request(app)
      .get('/api/users?sortBy=email&sortDirection=descending')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.body.data);
        assert.isArray(res.body.data);
        assert.operator(res.body.data[0].email, '>', res.body.data[1].email);
        done()
      });
  });

  it("GET success pagination", (done) => {
    chai
      .request(app)
      .get('/api/users?page=1&limit=12')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.body.data);
        assert.isArray(res.body.data);
        assert.lengthOf(res.body.data, 12);
        done()
      });
  });

  it("POST failure", (done) => {
    chai
      .request(app)
      .post('/api/users')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: 'brian', email: 'brian@brian.com'})
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        done()
      });
  });

  it("POST success", (done) => {
    chai
      .request(app)
      .post('/api/users')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: 'brian', email: 'brian@brian.com', dateOfBirth: 'yesterday', phoneNumber: 300, address: 'homeless'})
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.message, "New user created!");
        done()
      });
  });

  it("GET success POSTed user", (done) => {
    chai
      .request(app)
      .get('/api/users?match[email]=brian@BRIAN.com')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.body.data);
        assert.isArray(res.body.data);
        assert.lengthOf(res.body.data, 1);
        done()
      });
  });
});