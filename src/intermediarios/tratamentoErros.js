const tratarErros = (error, req, res, next) => {
    if (error instanceof SyntaxError) {
        return res.status(400).json({ message: "JSON mal formatado na solicitação." });
    }
    next();
}

module.exports = tratarErros;