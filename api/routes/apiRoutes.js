const express = require('express');
const router = express.Router();
const genresController = require('../controllers/apis/apiGenresController');
const moviesController = require('../controllers/apis/apiMoviesController');
const actorsController = require('../controllers/apis/apiActorsController');
const usersController = require('../controllers/apis/apiUsersController');
const { login, register } = require("../validations/userValidator")
const verifyToken = require("../middlewares/validate-token");

//GENRES
router.get('/genres', genresController.list);
router.get('/genres/:id', genresController.detail);
//MOVIES
router.get('/movies', verifyToken, moviesController.getAll);
router.get('/movies/:id', verifyToken, moviesController.getOne);
router.post('/movies/create', verifyToken, moviesController.create);
router.put('/movies/update/:id', verifyToken, moviesController.update);
router.delete('/movies/delete/:id', verifyToken, moviesController.delete);
//ACTORS
router.get('/actors/', actorsController.getAll); 
router.get('/actors/:id', actorsController.getOne); 
router.post('/actors/create', actorsController.create); 
router.put('/actors/update/:id', actorsController.update);
router.delete('/actors/delete/:id', actorsController.delete);
//USERS
//POST Creacion de usuario (registro)
router.post('/users', register, usersController.create);
//POST Login
router.post('/users/validar', login, usersController.validate);



module.exports = router