const bancoDeDados = require('../bancodedados');

function encontrarConta(numero_conta) {
    return bancoDeDados.contas.find((conta) => conta.numero === numero_conta);
}

function validarValor(res, valor) {
    if (valor <= 0) {
        return respostaDeErro(res, "O valor deve ser maior que zero.", 400);
    }
    if (!valor) {
        return respostaDeErro(res, "O valor deve ser informado.", 400);
    }
    return true;
}

function validarSenha(res, senha, contaEncontrada) {
    if (!senha) {
        return respostaDeErro(res, "A senha deve ser informada.", 400);
    }
    if (senha !== contaEncontrada.usuario.senha) {
        return respostaDeErro(res, "A senha informada é inválida.", 401);
    }
    return true;
}

function respostaDeErro(res, mensagem, status = 400) {
    res.status(status).json({ message: mensagem });
}

const depositoConta = (req, res) => {
    try {
        const { numero_conta, valor } = req.body;

        const contaEncontrada = encontrarConta(numero_conta);

        if (!contaEncontrada) {
            return respostaDeErro(res, "A conta informada não existe.", 404);
        }

        if (!validarValor(res, valor)) {
            return;
        }

        contaEncontrada.saldo += valor;

        const novoDeposito = {
            "data": new Date().toLocaleString(),
            "numero_conta": req.body.numero_conta,
            "valor": req.body.valor
        }
        bancoDeDados.depositos.push(novoDeposito);

        return res.status(200).json()
    } catch (erro) {
        respostaDeErro(res, "Erro interno do servidor.", 500);
    }
}

const saqueConta = (req, res) => {
    try {
        const { numero_conta, valor, senha } = req.body;
        if (!numero_conta) {
            return respostaDeErro(res, "A conta deve ser informada.", 400);
        }

        const contaEncontrada = encontrarConta(numero_conta);

        if (!contaEncontrada) {
            return respostaDeErro(res, "A conta informada não existe.", 404);
        }

        if (!validarValor(res, valor) || !validarSenha(res, senha, contaEncontrada)) {
            return;
        }

        if (contaEncontrada.saldo < valor) {
            return respostaDeErro(res, "O valor solicitado é maior que o saldo.", 400);
        }

        contaEncontrada.saldo -= valor;

        const novoSaque = {
            "data": new Date().toLocaleString(),
            "numero_conta": req.body.numero_conta,
            "valor": req.body.valor
        }
        bancoDeDados.saques.push(novoSaque);

        return res.status(200).json()
    } catch (erro) {
        respostaDeErro(res, "Erro interno do servidor.", 500);
    }
}

const transferirValor = (req, res) => {
    try {
        const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
        if (!numero_conta_destino || !numero_conta_origem) {
            return respostaDeErro(res, "Conta de origem ou destino não informada.", 404);
        }
        const contaOrigem = encontrarConta(numero_conta_origem);
        const contaDestino = encontrarConta(numero_conta_destino);

        if (!contaOrigem || !contaDestino) {
            return respostaDeErro(res, "A conta de origem ou destino informada não existe.", 404);
        }

        if (!validarValor(res, valor) || !validarSenha(res, senha, contaOrigem)) {
            return;
        }

        if (contaOrigem.saldo < valor) {
            return respostaDeErro(res, "Saldo insuficiente.", 400);
        }

        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;

        const novaTransferencia = {
            data: new Date().toLocaleString(),
            numero_conta_origem: req.body.numero_conta_origem,
            numero_conta_destino: req.body.numero_conta_destino,
            valor: req.body.valor
        };
        bancoDeDados.transferencias.push(novaTransferencia);

        return res.status(200).json();

    } catch (erro) {
        return respostaDeErro(res, "Erro interno do servidor.", 500);
    }

}


module.exports = { depositoConta, saqueConta, transferirValor }