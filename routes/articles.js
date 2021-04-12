const express = require('express');
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('newArticle',  {article: new Article() })
});

// EDIT ARTICLE
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('edit', {article: new Article() })
})
// BEFORE APPLYING SLUG
// router.get('/:id', async (req, res) => {
//     const article = await Article.findById(req.params.id).lean()
//     if (article == null) res.redirect('/')

    router.get('/:slug', async (req, res) => {
        const article = await Article.findOne({slug:req.params.slug}).lean()
        if (article == null) res.redirect('/')

    res.render('showArticle', { article: article , message: 'your entry has been saved!'})
});

// Save article to database
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
     } catch (e) {
       console.log(e)
        //  prefills info that was previously filled
        res.render('newArticle', { article: article})
     } 
    
})

router.put


// DELETED BLOG ARTICLES
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = 
    router



