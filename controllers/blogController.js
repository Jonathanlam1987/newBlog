


async function renderArticleList(req, res) {
    const items = await listProducts();
    
    const itemsToDisplay = req.query.cuisine
    ? items.filter((item) => item.cuisine === req.query.cuisine)
    : items;

    res.render('home', { items: itemsToDisplay, itemCuisine});

   
}



