var boot = require('../').boot,
  shutdown = require('../').shutdown,
  port = require('../').port,
  superagent = require('superagent'),
  expect = require('expect.js');
  


describe('fileanalyze', function() {
  before(function() {
    boot();
  });
  it('should respond to POST', function(done) {
    superagent
      .post('http://localhost:' + port + '/fileanalyze/')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        // Calling the end function will send the request 
        done();
      });
  })
  it('should output size of file1', function(done) {
    superagent
      .post('http://localhost:' + port + '/fileanalyze/')
      .attach('inputFile', 'test/files/test1.gif')
      .end(function(err, res) {
        expect(res.body.fileSize).to.equal(2608);
        done();
      });

  })
  it('should output size of file2', function(done) {
    superagent
      .post('http://localhost:' + port + '/fileanalyze/')
      .attach('inputFile', 'test/files/test2.html')
      .end(function(err, res) {
        expect(res.body.fileSize).to.equal(2993);
        done();
      });

  })



  after(function() {
    shutdown();
  });
});
