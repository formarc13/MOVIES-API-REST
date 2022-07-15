const express = require('express');
const router = express.Router();
const genresController = require('../controllers/apis/apiGenresController');
const moviesController = require('../controllers/apis/apiMoviesController');
const actorsController = require('../controllers/apis/apiActorsController');

//GENRES
router.get('/genres', genresController.list);
router.get('/genres/:id', genresController.detail);
//MOVIES
router.get('/movies', moviesController.getAll);
router.get('/movies/:id', moviesController.getOne);
router.post('/movies/create', moviesController.create);
router.put('/movies/update/:id', moviesController.update);
router.delete('/movies/delete', moviesController.delete);
//ACTORS
router.get('/actors/', actorsController.getAll); 
router.get('/actors/:id', actorsController.getOne); 
router.post('/actors/create', actorsController.create); 
router.put('/actors/update/:id', actorsController.update);
router.delete('/actors/delete/:id', actorsController.delete)


module.exports = router