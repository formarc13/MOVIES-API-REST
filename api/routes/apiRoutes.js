const express = require('express');
const router = express.Router();
const genresController = require('../controllers/apis/apiGenresController');
const moviesController = require('../controllers/apis/apiMoviesController');
const actorsController = require('../controllers/apis/apiActorsController');
const usersController = require('../controllers/apis/apiUsersController');
const { login, register } = require("../validations/userValidator")
const verifyToken = require("../middlewares/validate-token");

//GENRES
router.get('/api/genres', genresController.list);
router.get('/api/genres/:id', genresController.detail);
//MOVIES
router.get('/api/movies', verifyToken, moviesController.getAll);
router.get('/api/movies/:id', verifyToken, moviesController.getOne);
router.post('/api/movies/create', verifyToken, moviesController.create);
router.put('/api/movies/update/:id', verifyToken, moviesController.update);
router.delete('/api/movies/delete/:id', verifyToken, moviesController.delete);
//ACTORS
router.get('/api/actors/', actorsController.getAll); 
router.get('/api/actors/:id', actorsController.getOne); 
router.post('/api/actors/create', actorsController.create); 
router.put('/api/actors/update/:id', actorsController.update);
router.delete('/api/actors/delete/:id', actorsController.delete);
//USERS
//POST Creacion de usuario (registro)
router.post('/api/users', register, usersController.create);
//POST Login
router.post('/api/users/validar', login, usersController.validate);



module.exports = router