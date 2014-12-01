'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

    app.route('/api/videos')
        .get(api.getVideos)
        .put(api.saveVideo);

    app.route('/api/categories')
        .get(api.getCategories);

    app.post('/api/videos/:videoId/votes', api.castVote);

    app.route('/api/videos/:videoId')
        .delete(api.deleteVideo);

  // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function(req, res) {
            res.send(404);
        });

  // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/google00dad89435d2d3b6.html')
        .get(function(req, res) {
            res.send('google-site-verification: google00dad89435d2d3b6.html');
        });
    app.route('/*')
        .get(index.index);
};