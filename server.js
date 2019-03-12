const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const movies = require('./routes/api/movies');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then( () => console.log("MondoDB connected!"))
    .catch(err => console.log(err));


//Use routes
app.use('/api/movies', movies);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));