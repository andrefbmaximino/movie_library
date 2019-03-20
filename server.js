const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();

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

const port = process.env.PORT || 5000;

// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));