const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Movies model
const Movie = require('../../models/Movie');


// @route   GET /api/movie
// @desc    Get movies of a state
// @access  Public
router.get('/:state', (req, res) => {

    
    let regex = new RegExp();
    if(req.query.search){
        regex = RegExp(req.query.search, 'i');
    }
    

    Movie
        .find({state: req.params.state, Title: regex})
        .sort({'date': -1})
        .limit(parseInt(req.query.limit))
        .exec(function(err, movies) {
            if(movies){
                res.json(movies)
            } else{
                res.status(404).json({ nomoviesfound: 'No movies found' })
            }
        });
})


// @route   POST /api/movie
// @desc    Create or edit new movie
// @access  Public
router.post('/',  (req, res) => {

        //get fields
        const movieFields = {};
        if(req.body._id) movieFields._id = req.body._id;
        if(req.body.Title) movieFields.Title = req.body.Title;
        if(req.body.Poster) movieFields.Poster = req.body.Poster;
        if(req.body.Plot) movieFields.Plot = req.body.Plot;
        if(req.body.state) movieFields.state = req.body.state;
        if(req.body.Year) movieFields.Year = req.body.Year;
        
        Movie.findOne({ _id: movieFields._id})
            .then(movie => {
                if(movie){
                    
                    //Update
                    Movie.findOneAndUpdate(
                        { _id: movieFields._id }, 
                        { $set: movieFields }, 
                        { new: true }
                    )
                    .then(movie => res.json(movie));
                } else{
                    
                    //Save movie
                    new Movie(movieFields).save().then(movie => res.json(movie));

                }
            })
    }
);

// @route   Delete /api/movie
// @desc    Delete all movies
// @access  Public
router.delete('/',  (req, res) => {
    Movie.deleteMany()
        .then(res.send("Apagados"));
        
});

module.exports = router;