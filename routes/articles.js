const express = require('express');
const ARTICLE = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('newArticle', )
});

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

// Save article to database
router.post('/', async (req, res) => {
    let article = new ARTICLE({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
    article = await article.save()
    res.redirect(`{/articles/${ article.id }`)
     } catch (e) {
        //  prefills info that was previously filled
        res.render('articles/new', { article: article})
     } 
    
})

module.exports = 
    router



