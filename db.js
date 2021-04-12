const mongoose = require('mongoose')



// CONNECTING TO DB
mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Connected To Database!')
);

module.exports = mongoose 