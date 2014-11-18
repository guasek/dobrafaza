var mongoose = require('mongoose');

require('../../models/category');
var Category = mongoose.model('Category'),
    fs = require('fs'),
    readline = require('readline');

//Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/dobrafaza');

var rd = readline.createInterface({
    input: fs.createReadStream('categories.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var category = new Category();

    category.name = line;

    category.save();
    console.log(category);
});
