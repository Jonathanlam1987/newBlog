const express = require('express');
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('newArticle',  {article: new Article() })
});

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')


    res.render('showArticle', { article: article})
})




// Save article to database
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
    article = await article.save()
    res.redirect(`/articles/${article.id}`)
     } catch (e) {
       console.log(e)
        //  prefills info that was previously filled
        res.render('newArticle', { article: article})
     } 
    
})

module.exports = 
    router



