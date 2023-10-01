const express = require('express');
const autenticacaoSenha = require('../intermediarios/autenticacaoSenha.js');
const validacaoDeDados = require('../intermediarios/validacaoDeDados.js');
const { listarContas, criarConta, atualizarUsuario, deletarConta, mostrarSaldo, mostrarExtrato } = require('../controladores/contasControladores.js');


const contas = express.Router();
contas.use(autenticacaoSenha)

contas.get("/contas", listarContas);
contas.get("/contas/saldo", mostrarSaldo);
contas.get("/contas/extrato", mostrarExtrato);
contas.post("/contas", validacaoDeDados, criarConta);
contas.put("/contas/:numeroConta/usuario", validacaoDeDados, atualizarUsuario);
contas.delete("/contas/:numeroConta", deletarConta);

module.exports = contas;