const bancoDeDados = require("../bancodedados");

const validacaoDeDados = (req, res, next) => {
    const { nome, cpf, email, data_nascimento, telefone, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'O nome deve ser informado.' })
    }
    if (!cpf || cpf.length !== 11) {
        return res.status(400).json({ message: 'CPF não informado ou inválido.' });
    }

    const cpfExiste = bancoDeDados.contas.some((conta) => conta.usuario.cpf === cpf);
    if (cpfExiste) {
        return res.status(400).json({ message: 'Já existe uma conta com o CPF informado.' });
    }

    if (!email) {
        return res.status(400).json({ message: "O email deve ser informado." })
    };
    const emailExiste = bancoDeDados.contas.some((conta) => conta.usuario.email === email);
    if (emailExiste) {
        return res.status(400).json({ message: 'Já existe uma conta com o email informado.' });
    }

    if (!data_nascimento) {
        return res.status(400).json({ message: 'A data de nascimento deve ser informada.' })
    }
    if (!telefone) {
        return res.status(400).json({ message: 'O telefone deve ser informado.' })
    }
    if (!senha) {
        return res.status(400).json({ message: 'A senha deve ser informada.' })
    }

    next();
}

module.exports = validacaoDeDados;