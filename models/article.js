
const mongoose = require('../db');
const Schema = mongoose.Schema;


const articleSchema = new Schema({
    title: { 
        type: String,
        required: true 
    },
    description: {
        type: String, 
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article