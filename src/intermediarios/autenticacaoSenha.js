const bancoDeDados = require('../bancodedados');

const autenticacaoSenha = (req, res, next) => {
    let senhaInformada = req.query.senha_banco;

    if (!senhaInformada) {
        return res.status(400).json({ message: 'A senha deve ser informada.' })
    }
    if (senhaInformada !== bancoDeDados.banco.senha) {
        return res.status(401).json({ message: 'Senha informada é inválida.' })
    }

    next();
}

module.exports = autenticacaoSenha;