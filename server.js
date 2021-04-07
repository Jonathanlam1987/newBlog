
const express = require('express');
const expressHandlebars = require('express-handlebars')

const mongoose = require('mongoose');

const app = express();
const PORT = 9999;







// CONFIG EXPRESS TO USE HANDLEBARS
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHandlebars({
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
}));



const articleRouter = require('./routes/articles')



// MIDDLEWARE
app.use('/articles', articleRouter);

app.get('/', (re, res) => {
    res.send('home')
})






// CONNECTING TO DB
// mongoose.connect(
//     process.env.CONNECTION_STRING,
//     { useNewUrlParser: true , useUnifiedTopology: true},
//     () => console.log('Connected To Database!')
// )


// LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`Listening in on port ${PORT}`)
})