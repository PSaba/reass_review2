const chai = require("chai");
const chaiHttp = require("chai-http");
const HTTPStatus = require("http-status");

const server = require("../app");
chai.use(chaiHttp);
chai.should();
const agent = chai.request.agent(server);
const db = require("../models/index");

userA = {
    email: "a@a.com",
    name: "a",
    password: "a",
}

describe('Auth', function() {
    describe('Joining', function(){
        it('should fail when email is empty', function(done) {
        agent
        .post("/users")
        .send({name: "a", password: "a"})
        .end(function(err, res){
            res.should.have.status(HTTPStatus.BAD_REQUEST);
            res.text.should.equal("email is required");
            done();
        });
        });

        it('should fail when name is empty', function(done) {
            agent
            .post("/users")
            .send({email: "a@a.com", password: "a"})
            .end(function(err, res){
                res.should.have.status(HTTPStatus.BAD_REQUEST);
                res.text.should.equal("name is required");
                done();
            });
        });

        it('should fail when password is empty', function(done) {
            agent
            .post("/users")
            .send({email: "a@a.com", name: "a"})
            .end(function(err, res){
                res.should.have.status(HTTPStatus.BAD_REQUEST);
                res.text.should.equal("password is required");
                done();
            });
        });

        it('should create new users', function(done){
            agent
            .post("/users")
            .send(userA)
            .end(function(err, res){
                res.should.have.status(HTTPStatus.CREATED);
                res.body.should.be.a("object");
                res.body.should.have.a.property("email").eql(userA.email);
                res.body.should.have.a.property("name").eql(userA.name);
                res.body.should.have.a.property("password").eql(userA.password);
            done();
            });
        });

        it('should fail email already exists', function(done) {
            agent
            .post("/users")
            .send(userA)
            .end(function(err, res){
                res.should.have.status(HTTPStatus.BAD_REQUEST);
                res.text.should.equal("email must be unique");
                done();
            });
        });
    });

    describe('Login', function(){
        it('should fail when email is empty', function(done) {
        agent
        .post("/users/login")
        .send({password: "a"})
        .end(function(err, res){
            res.should.have.status(HTTPStatus.BAD_REQUEST);
            res.text.should.equal("email is required");
            done();
        });
        });

        it('should fail when password is empty', function(done) {
            agent
            .post("/users/login")
            .send({email: "a@a.com"})
            .end(function(err, res){
                res.should.have.status(HTTPStatus.BAD_REQUEST);
                res.text.should.equal("password is required");
                done();
            });
        });

        it('should fail when credentials are wrong', function(done) {
            agent
            .post("/users/login")
            .send({email: "a@a.com", password: "incorrectpassword"})
            .end(function(err, res){
                res.should.have.status(HTTPStatus.UNAUTHORIZED);
                res.text.should.equal("email or password is incorrect");
                done();
            });
        });

        it('should log a user in', function(done){
            agent
            .post("/users/login")
            .send(userA)
            .end(function(err, res){
                res.should.have.status(HTTPStatus.OK);
            done();
            });
        });
    });

    

});