process.env.NODE_ENV = 'test';

const Car = require('../models/car')
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');


chai.use(chaiHttp);


before((done) => {
    Car.deleteMany({}, function(err) {});
    done();
})

after((done) => {
    Car.deleteMany({}, function(err) {});
    done();
})





describe('/First Test Collection', () => {

    it('should verify that we have 0 products in the DB', (done) => {
        chai.request(server)
        .get('/api/car')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });

});


/*
    it('should POST a valid product', (done) => {

        let product = {
            brand: "Ferrari",
            model: "488 Pista",
            year: "2018",
            price: "400000",
            type: "sportscar"
        }

        chai.request(server)
        .post('/api/car')
        .send(product)
        .end((err, res) => {
            res.should.have.status(201); // I min post route har jeg ikke 201, men data
            done();
        });
    });
*/
/*
    it('should verify that we have 1 products in the DB', (done) => {
        chai.request(server)
        .get('/api/car')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
    });

*/

/*     
    it('Test default API welcome route', (done) => {

        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        
        done();
        });
    }) 




    it('Should test two values....', () => {
        // Test content here
        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal);
    })
})
*/