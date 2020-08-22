const { request } = require("express");

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database')
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000)


//funciones  middlewares
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/api/tasks', require('./routes/task.routes'))



//archivos estaticos
console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));



//Iniciando el servidors
app.listen(app.get('port'), () => {
    console.log(`Servidor en el Puerto ${app.get('port')}`)

});