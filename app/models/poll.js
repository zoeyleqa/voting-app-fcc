'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
        id: String,
        q: String, 
        a: [{opt: String, numVote: Number} ]    
        
});

module.exports = mongoose.model('Poll', Poll);
