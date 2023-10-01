const express = require('express');
const contas = require("./contasRotas.js");
const transacoes = require("./transacoesRotas.js");

const rotas = (app) => {
<<<<<<< Updated upstream
    app.use(express.json(), transacoes, contas);
    app.get("/", (req, res) => res.status(200).json({ message: "Bem-vindo ao App CubosBank!" }));
=======
    app.use(express.json(), tratarErros, transacoes, contas);
    app.get("/", (req, res) => res.status(200).json({ message: "Bem-vindo ao App Bank Tech!" }));
>>>>>>> Stashed changes
}

module.exports = rotas;