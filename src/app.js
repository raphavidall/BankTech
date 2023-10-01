const express = require('express');
const rotas = require('../src/rotas/index');

const app = express();
rotas(app);


module.exports = app;