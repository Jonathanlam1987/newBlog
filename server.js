require('dotenv').config();
const express = require('express');
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser');
const Article = require('./models/article');
const methodOverride = require('method-override');


const {
    authenticateUser,
    validateAuthentication,
  } = require("./middleware/authMiddleware.js");

const {  renderSignupForm,
    processSignupSubmission,
    renderLoginForm,
    processLoginSubmission,
    renderLogout} = require('./controllers/userController.js')

const app = express();
const PORT = 8888
    


// CONFIG EXPRESS TO USE HANDLEBARS
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHandlebars({
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
}));

const articleRouter = require('./routes/articles')


// MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookieParser());
app.use(authenticateUser);


app.use('/articles', articleRouter);

// ROUTING
app.get('/', async (re, res) => {
    const articles = await Article.find().lean().sort({ createdAt: 'desc'})
    // TEST ARTICLE
    // const articles = [{
    //     title: ' First articles',
    //     createdAt: new Date(),
    //     description: 'First description'
    // },
    // {
    //     title: ' First articles',
    //     createdAt: new Date(),
    //     description: 'First description'
    // },
    res.render('home', { articles: articles })
})
app.get('/logout', renderLogout)

app.get('/signup', renderSignupForm);
app.post('/signup', processSignupSubmission);

app.get('/login', renderLoginForm);
app.post('/login', processLoginSubmission)




// LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`Listening in on port ${PORT}`)
})