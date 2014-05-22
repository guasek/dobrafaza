var mongoose = require('mongoose');

require('../../models/video');
var Video = mongoose.model('Video'),
    fs = require('fs'),
    readline = require('readline');

//Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/dobrafaza');

var rd = readline.createInterface({
    input: fs.createReadStream('movies.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var video = new Video();

    video.videoId = line;
    video.vendorId = 1;
    video.save();
    console.log(line);
});