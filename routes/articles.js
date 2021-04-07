const express = require('express');
const ARTICLE = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('newArticle')
});

router.post('/', (req, res) => {
    res.render
})
module.exports = 
    router



