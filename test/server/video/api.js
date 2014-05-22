'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

describe('GET /api/awesomeThings', function() {

    it('should respond with JSON array', function(done) {
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
                done();
            });
    });
});