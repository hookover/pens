/**
 * Created by apple on 16/6/27.
 */
var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    pool:{
        creator: String,
        question: String,
        choices: [{
            text: String,
            votes: Number
        }]
    },
    ip: {
        pool_question: String,
        ip: String
    }
});

module.exports = mongoose.model('Poll', pollSchema);