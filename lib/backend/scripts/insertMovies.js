var mongoose = require('mongoose');

require('../../models/video');
var Video = mongoose.model('Video'),
    fs = require('fs'),
    readline = require('readline');

//Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/dobrafaza-dev');

var rd = readline.createInterface({
    input: fs.createReadStream('movies.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var video = new Video();

    var videoIdRegex = /v=(.*)/mig;
    var urlAndTitle = line.split(';;')
    video.videoId = videoIdRegex.exec(urlAndTitle[0])[1];
    video.vendorId = 1;
    video.title = urlAndTitle[1];

    video.save();
    console.log(video);
});
