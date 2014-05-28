'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

describe('Videos api', function() {

    it('GET /api/videos should respond with JSON array', function(done) {
        Video.remove({}, function(){});
        ['oukX49mJppM', 'Yz1rfDY-wlg', 'KRwDTj-Rcmk', 'ca1nQa2Feb0'].map(function(videoId) {
            var newVid = new Video();
            newVid.videoId = videoId;
            newVid.vendorId = 1;
            newVid.save();
        })
        request(app)
            .get('/api/videos')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(4);
                done();
            });
    });
});