const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const app = require("./src/index.js");
chai.use(chaiHttp);

describe("GET users", () => {
  it("success", (done) => {
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

  it("success sortby ascending", (done) => {
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

  it("success sortby descending", (done) => {
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

  it("success pagination", (done) => {
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
});