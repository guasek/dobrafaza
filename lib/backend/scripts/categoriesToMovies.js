var mongoose = require('mongoose');

require('../../models/category');
require('../../models/video');
var Category = mongoose.model('Category');
var Video = mongoose.model('Video');

//Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/dobrafaza');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Video.find({}).sort({createdAt: -1}).exec(function (err, videos) {
    Category.find({}).exec(function(err, categories) {
        for (var index = 0; index < videos.length; index++) {
//            videos[index].categories.pop(1);
            console.log(videos[index]);
            videos[index].categories.push(categories[getRandomInt(0, categories.length)]._id);
            videos[index].save();
        }
    });
});
