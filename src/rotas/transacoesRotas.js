const express = require('express');
const { depositoConta, saqueConta, transferirValor } = require('../controladores/transacoesControladores.js');

const transacoes = express.Router();

transacoes.post("/transacoes/depositar", depositoConta);
transacoes.post("/transacoes/sacar", saqueConta);
transacoes.post("/transacoes/transferir", transferirValor);

module.exports = transacoes;
