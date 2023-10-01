const bancoDeDados = require('../bancodedados.js');

function encontrarConta(numero_conta) {
    return bancoDeDados.contas.find((conta) => conta.numero === numero_conta);
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

function respostaDeErro(res, mensagem = "Falha no Servidor", status = 500) {
    res.status(status).json({ message: mensagem });
}


const listarContas = (req, res) => {
    return res.status(200).json(bancoDeDados.contas);
}

let contadorContas = 1;
const criarConta = (req, res) => {
    try {
        const novaConta = {
            numero: contadorContas,
            saldo: 0,
            usuario: {
                nome: req.body.nome,
                cpf: req.body.cpf,
                data_nascimento: req.body.data_nascimento,
                telefone: req.body.telefone,
                email: req.body.email,
                senha: req.body.senha
            }
        };

        contadorContas++;
        bancoDeDados.contas.push({
            ...novaConta
        });

        return res.status(200).json({ message: 'Conta Cadastrada com sucesso!' })
    } catch (erro) {
        return respostaDeErro(res, "Falha no cadastro da nova conta", 500);
    }

}

const atualizarUsuario = (req, res) => {
    const numeroConta = Number(req.params.numeroConta);
    if (!numeroConta) return respostaDeErro(res, "A conta deve ser informada.", 400);
    const contaEncontrada = encontrarConta(numeroConta);
    if (!contaEncontrada) return respostaDeErro(res, "A conta informada não existe", 404);

    try {
        contaEncontrada.usuario.nome = req.body.nome;
        contaEncontrada.usuario.cpf = req.body.cpf;
        contaEncontrada.usuario.data_nascimento = req.body.data_nascimento;
        contaEncontrada.usuario.telefone = req.body.telefone;
        contaEncontrada.usuario.email = req.body.email;
        contaEncontrada.usuario.senha = req.body.senha;

        return res.status(200).json({ message: "Conta atualizada com sucesso." });
    } catch (erro) {
        return respostaDeErro(res, "Falha ao atualizar conta bancária.", 500);
    }
}

const deletarConta = (req, res) => {
    try {
        const numeroConta = Number(req.params.numeroConta);
        if (!numeroConta) return respostaDeErro(res, "A conta deve ser informada", 400);

        const contaEncontrada = encontrarConta(numeroConta);
        if (!contaEncontrada) return respostaDeErro(res, "A conta informada não existe.", 404);

        const indiceConta = bancoDeDados.contas.findIndex((conta) => {
            return conta.numero === numeroConta;
        });

        if (contaEncontrada.saldo === 0) {
            bancoDeDados.contas.splice(indiceConta, 1);
            return res.status(204).json({ message: "Conta excluída com sucesso." });
        } else {
            return respostaDeErro(res, "A conta só pode ser excluída quando o saldo for zero.", 400);
        }
    } catch (erro) {
        return respostaDeErro(res, "A conta informada não existe", 404)
    }
}

const mostrarSaldo = (req, res) => {
    try {
        const numero_conta = Number(req.query.numero_conta);
        const senha = req.query.senha;
        if (!numero_conta) return respostaDeErro(res, "A conta deve ser informada", 400);

        const contaEncontrada = encontrarConta(numero_conta);
        if (!contaEncontrada) return respostaDeErro(res, "A conta informada não existe.", 404);

        if (!validarSenha(res, senha, contaEncontrada)) {
            return;
        }
        const saldo = contaEncontrada.saldo;
        res.status(200).json({ "saldo": saldo });
    } catch (erro) {
        console.log(erro)
        return respostaDeErro(res, "Erro interno do servidor.", 500)
    }
}

const mostrarExtrato = (req, res) => {
    try {
        const numero_conta = Number(req.query.numero_conta);
        const senha = req.query.senha;
        if (!numero_conta) return respostaDeErro(res, "A conta deve ser informada", 400);
        const contaEncontrada = encontrarConta(numero_conta);
        if (!contaEncontrada) return respostaDeErro(res, "A conta informada não existe.", 404);

        if (!validarSenha(res, senha, contaEncontrada)) {
            return;
        }

        const depositos = bancoDeDados.depositos.filter((deposito) => {
            return deposito.numero_conta === Number(numero_conta);
        });

        const saques = bancoDeDados.saques.filter((saque) => {
            return saque.numero_conta === Number(numero_conta);
        });

        const tranferencias_recebidas = bancoDeDados.transferencias.filter((transferencia) => {
            return transferencia.numero_conta_destino === Number(numero_conta);
        });

        const tranferencias_realizadas = bancoDeDados.transferencias.filter((transferencia) => {
            return transferencia.numero_conta_origem === Number(numero_conta);
        });

        const extrato = {
            "depositos": [...depositos],
            "saques": [...saques],
            "tranferencias_recebidas": [...tranferencias_recebidas],
            "transferências_realizadas": [...tranferencias_realizadas]
        }

        return res.status(200).json({ extrato });
    } catch (erro) {
        return respostaDeErro(res, "Erro interno do servidor.", 500)
    }
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarConta,
    mostrarSaldo,
    mostrarExtrato
};