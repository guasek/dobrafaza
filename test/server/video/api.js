'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    testVideos = require('./test_videos'),
    Video = mongoose.model('Video');

describe('Videos api', function() {

    it('PUT /api/videos Save Video along with the changes made.', function(done) {
        Video.remove({}, function(){});
        var vendorId = 'asdasdsa';
        request(app)
            .put('/api/videos')
            .send({vendorId: vendorId})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);

                var savedVid = res.body;
                savedVid._id.length.should.be.equal(24);
                savedVid.vendorId.should.equal(vendorId);
                savedVid.categories.length.should.equal(0);

                var categoryId = 'adscxzzczx';
                savedVid.categories.push(categoryId);

                request(app)
                    .put('/api/videos')
                    .send(savedVid)
                    .expect(200)
                    .end(function(err, res) {
                        var sameVid = res.body;
                        sameVid._id.should.equal(savedVid._id);
                        sameVid.categories[0].should.equal(categoryId);
                        done();
                    })
            });
    });

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

    it('GET /api/videos?per_page&page should be able to page videos.', function(done) {

        Video.remove({}, function(){});
        testVideos.testVideos.map(function(video) {
            var newVid = new Video();
            newVid.videoId = video._id;
            newVid.vendorId = video.videoId;
            newVid.title = video.title;
            newVid.votesUp = video.votesUp;
            newVid.votesDown = video.votesDown;
            newVid.categories = video.categories;
            newVid.createdAt = video.createdAt;
            newVid.save();
        })
        request(app)
            .get('/api/videos?page=2&per_page=2')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.videosCount.should.equal(4);

                res.body.videos.should.be.instanceof(Array);
                res.body.videos.length.should.equal(2);

                res.body.videos[0].videoId.should.equal('KRwDTj-Rcmk');
                res.body.videos[1].videoId.should.equal('oukX49mJppM');
                done();
            });
    });
});
