const express = require('express');
const router = express.Router();
const genresController = require('../controllers/apis/apiGenresController');
const moviesController = require('../controllers/apis/apiMoviesController');
const actorsController = require('../controllers/apis/apiActorsController');
const usersController = require('../controllers/apis/usersController');
//GENRES
router.get('/genres', genresController.list);
router.get('/genres/:id', genresController.detail);
//MOVIES
router.get('/movies', moviesController.getAll);
router.get('/movies/:id', moviesController.getOne);
router.post('/movies/create', moviesController.create);
router.put('/movies/update/:id', moviesController.update);
router.delete('/movies/delete/:id', moviesController.delete);
//ACTORS
router.get('/actors/', actorsController.getAll); 
router.get('/actors/:id', actorsController.getOne); 
router.post('/actors/create', actorsController.create); 
router.put('/actors/update/:id', actorsController.update);
router.delete('/actors/delete/:id', actorsController.delete);
//USERS
//POST Creacion de usuario (registro)
router.post('/users/agregar', usersController.create);
//POSTLogin
router.post('/users/validar', usersController.validate);



module.exports = router