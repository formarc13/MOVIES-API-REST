const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
require("dotenv").config();


//Ejecuto el llamado a mis rutas
const apiRoutes = require('./api/routes/apiRoutes');

//Aquí pueden colocar las rutas de las APIs


// view engine setup
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

/* app.use('/', apiRoutes); */
app.use('/', (req, res) => res.json({value: "Hello vercel"}) );


//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
