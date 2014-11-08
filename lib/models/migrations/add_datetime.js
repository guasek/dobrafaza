var mongoose = require('mongoose');
var sleep = require('sleep');

require('../../models/video');
var Video = mongoose.model('Video');

//Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/dobrafaza-dev');


return Video.find({}).sort().exec(function (err, videos) {
    for(var index = 0; index < videos.length; index++) {
        videos[index].createdAt = Date();
        videos[index].save();
        console.log(videos[index]);
        sleep.sleep(1);
    }
});
