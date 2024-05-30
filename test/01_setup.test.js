process.env.NODE_ENV = 'test';

const Car = require('../models/car');
const User = require('../models/user');


//clean up the database before and after each test
beforeEach((done) => { 
    Car.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});

afterEach((done) => {
    User.deleteMany({}, function(err) {});
    Car.deleteMany({}, function(err) {});
    done();
});