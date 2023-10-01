const express = require('express');
const contas = require("./contasRotas.js");
const transacoes = require("./transacoesRotas.js");
const tratarErros = require('../intermediarios/tratamentoErros.js')

const rotas = (app) => {
    app.use(express.json(), tratarErros, transacoes, contas);
    app.get("/", (req, res) => res.status(200).json({ message: "Bem-vindo ao App CubosBank!" }));
}


module.exports = rotas;