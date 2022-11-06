const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
var { faker } = require("@faker-js/faker");

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("user API", function () {
    this.timeout(100000);
    //
    it("should get token", function (done) {
      var input = {
        emailAddress: "Lamont.Mosciski33@yahoo.com",
        password: "1",
      };
      chai
        .request("http://localhost:3000")

        .post("/user/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(input)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");

          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.should.have.property("token");
          done();
        });
    });
    // =================================================================
    it("error get token", function (done) {
      var input = {
        emailAddress: "Lamont.Mosciski33@yahoo.com",
        password: "12",
      };
      chai
        .request("http://localhost:3000")

        .post("/user/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(input)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a("object");

          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.should.have.property("error");
          done();
        });
    });
    // =================================================================
    it("create user", function (done) {
      var input = {
        userName: faker.internet.userName(),
        accountNumber: faker.datatype.uuid(),
        emailAddress: faker.internet.email(),
        identityNumber: faker.datatype.uuid(),
        password: "1",
      };
      // var input = {
      //   userName: "Brown.McLaughlin",
      //   accountNumber: "951095c9-723c-4f2f-80dd-c78632c908ad",
      //   emailAddress: "Maximillia.Bruen@yahoo.com",
      //   identityNumber: "ab6a116e-47c4-4618-b41e-1579e0e4afe2",
      //   password: "1",
      // };

      chai
        .request("http://localhost:3000")

        .post("/user")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(input)
        .end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a("object");

          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          done();
        });
    });
    // =================================================================
    it("delete user", function (done) {
      // var input = {
      //   userName: faker.internet.userName(),
      //   accountNumber: faker.datatype.uuid(),
      //   emailAddress: faker.internet.email(),
      //   identityNumber: faker.datatype.uuid(),
      //   password: "1",
      // };

      var id = "6367bdb6a3031873ccfb99c7";

      chai
        .request("http://localhost:3000")

        .delete(`/user/${id}`)
        .set("Content-Type", "application/x-www-form-urlencoded")

        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");

          res.body.should.have.property("status");
          res.body.should.have.property("message");

          done();
        });
    });
  });
});
