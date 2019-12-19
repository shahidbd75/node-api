const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')));

//Error

app.use((error,req,res,next) => {
    console.log(error);
    
})

//CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','ContentType,Authorization');

    next();
});

app.use('/feed', feedRoutes);

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then((result) => {
    app.listen(8080);
}).catch(err => {
    console.log('Failed to connect to database', err);
});
