//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Objects', () => {
    /*
     * Test the /GET route
     */
    describe('/GET object', () => {
        it('it should GET all the objects', (done) => {
            chai.request(server)
                .get('/api/object')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.should.have.property('message').eql('Retrieved All Objects');
                    done();
                });
        });
    });

    /*
     * Test the /POST route to create or update
     */
    describe('/POST object', () => {
        it('it should POST a object', (done) => {
            let object = {
                key: "absddff",
                value: "1231231"
            };
            chai.request(server)
                .post('/api/object')
                .send(object)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.should.have.property('message').eql('Object Created');
                    done();
                });
        });
        it('it should UPDATE a object', (done) => {
            let object = {
                key: "absddff",
                value: "232322"
            };
            chai.request(server)
                .post('/api/object')
                .send(object)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('number');
                    res.body.should.have.property('message').eql('1 objects updated');
                    done();
                });
        });

    });

    /*
     *  Test the /GET/:id route
     */
    describe('/GET/:key object', () => {
        it('it should GET a object by the given key', (done) => {
            let key = '1212';
            chai.request(server)
                .get('/api/object/' + key)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.should.have.property('message').eql('Retrieved Object');
                    done();
                });

        });
    });

    /*
     *  Test the /GET/:id route
     */
    describe('/GET/:key object', () => {
        it('it should GET a empty array by the given key', (done) => {
            let key = '12321321321';
            chai.request(server)
                .get('/api/object/' + key)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.length(0);
                    res.body.should.have.property('message').eql('Retrieved Object');
                    done();
                });

        });
    });

});