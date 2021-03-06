
const mongoose = require('../db');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const marked = require('marked');
const createdompurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createdompurify(new JSDOM().window)


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
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
});

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { lower:true, strict: true })
 }
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
 next()
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article