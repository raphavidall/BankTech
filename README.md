# API REST - BANK TECH

![API Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

### Tópicos:

- [Descrição do projeto](#descrição-do-projeto)

- [Funcionalidades](#funcionalidades)

- [Ferramentas utilizadas](#ferramentas-utilizadas)

- [Acesso ao projeto](#acesso-ao-projeto)

- [Abrir e rodar o projeto](#abrir-e-rodar-o-projeto)

- [Desenvolvedora](#desenvolvedora)

## Descrição do projeto

<p align="justify">
 Projeto desenvolvido no desafio de conclusão do módulo II do curso de backend da Turma Ifood 1000 da escola Cubos Academy. O Bank Tech consiste em uma <b>API Rest</b> para simulação de operações bancárias, onde é possível simular algumas movimentações de um banco fictício, executando as operações primitivas CRUD (create, read, update and delete) pela conexão HTTP com o próprio servidor local.
</p>

## Funcionalidades

- Criar conta bancária
- Listar contas bancárias
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depósitar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

### Demonstração Insomnia:

<img src= "./src/assets/ezgif.com-video-to-apng.png" alt="gif-app-bank-tech-test-insomnia" width="900">

## Ferramentas utilizadas

<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vscode_icon_130084.png" alt="vscode-icons" width="60">
<br>
<a href="https://code.visualstudio.com/download"> <span> Vs Code </span></a>
<br>
<br>
<img src="https://i.ibb.co/F6Lwhv4/apps-insomnia-512x512.png" alt="insominia-icons" width="60">
<br>
<a href="https://insomnia.rest/download"><span> Insomnia </span></a>

## Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/raphavidall/BankTech) ou [baixá-lo](https://github.com/raphavidall/BankTech/archive/refs/heads/main.zip).

## Abrir e rodar o projeto

Para começar a usar a API Bank Tech, siga estas etapas:

Faça um Fork do repositório.

Clone este repositório em sua máquina local:

    git clone https://github.com/seu-usuario/BankTech.git

Abra o a pasta do projeto no seu VsCode.

Instale as dependências do projeto com o comando:

    npm i

Execute o código com o comando:

    node servidor.js

A API Bank Tech estará disponível em http://localhost:3000.

Para realizar requisições com os verbos POST, PUT, DELETE use o app Insomnia ou similar.

### Aqui está uma lista dos métodos e parâmetros obrigatórios para que você consiga obter os dados na API:

#### Listar todas as contas do banco:

```javascript
//GET - localhost:3000/contas?senha_banco="SenhaDefinidaNoBancoDeDados
//No parâmetro de consulta, inclua a senha definida para o banco no arquivo de banco de dados.
```

#### Criar uma nova conta:

```javascript
//POST - localhost:3000/contas
//No corpo da requisição, envie um objeto no formato json contendo os seguintes dados:

{
 "nome": "Exemplo",
 "cpf": "00000000000",
 "data_nascimento": "01/01/1992",
 "telefone": "85900000000",
 "email": "exemplo@exemplo.com",
 "senha": "Teste123"
}
```

Este método criará uma nova conta bancária no seu banco de dados. A API irá retornar mensagens de erro personalizadas, caso algum campo não esteja no formato adequado, ou caso algum campo obrigatório não seja informado.

#### Atualizar os dados do usuário da conta bancária:

```javascript
//PUT - localhost:3000/contas/:numeroConta/usuario
//No corpo da requisição, envie um objeto no formato json contendo os seguintes dados:

{
 "nome": "Exemplo",
 "cpf": "00000000000",
 "data_nascimento": "01/01/1992",
 "telefone": "85900000000",
 "email": "exemplo@exemplo.com",
 "senha": "Teste123"
}
```

Este método atualizará os dados da conta bancária especificada no parâmetro de rota pelo (:numeroConta). Assim como na criação de uma nova conta, a API irá retornar mensagens de erro personalizadas, caso algum campo não esteja no formato adequado, ou caso algum campo obrigatório não seja informado.

#### Excluir uma conta bancária:

```javascript
//DELETE - localhost:3000/contas/:numeroConta
//Para excluir uma conta basta realizar o método delete na rota supracitada, indicando o numero da conta a ser excluída no parâmetro de rota (:numeroConta).
```
A conta será excluída (retirada dos dados em memória).

#### Depósitar em uma conta bancária:

```javascript
//POST - localhost:3000/transacoes/depositar
//No corpo da requisição, envie um objeto no formato json contendo os seguintes dados:

{
 "numero_conta": 1,
 "valor": 1000
}
```
O valor informado será adicionado ao saldo da conta especificada no objeto.

#### Sacar de uma conta bancária:

```javascript
//POST - localhost:3000/transacoes/sacar
//No corpo da requisição, envie um objeto no formato json contendo os seguintes dados:

{
 "numero_conta": 1,
 "valor": 1000,
 "senha": "Conta01"
}
```
O valor informado será deduzido do saldo da conta especificada no objeto.

#### Transferir valores entre contas bancárias:

```javascript
//POST - localhost:3000/transacoes/tranferir
//No corpo da requisição, envie um objeto no formato json contendo os seguintes dados:

{
 "numero_conta_origem": 1,
 "numero_conta_destino": 2,
 "valor": 1000,
 "senha": "senhaDaContaOrigem"
}
```
       
O valor informado será deduzido da conta de origem e adicionado ao saldo da conta de destino especificadas no objeto.

#### Consultar saldo da conta bancária:

```javascript
//GET - localhost:3000/contas/saldo?numero_conta=1&senha=SenhaConta1
//Este método retornará o saldo atualizado da conta especificada no parâmetro de consulta (numero_conta), a senha da conta também deve ser passada no parâmetro de consulta.
```
O saldo será exibido na resposta da requisição.

#### Emitir extrato bancário:

```javascript
//GET - localhost:3000/contas/extrato?numero_conta=1&senha=SenhaConta1
//Este método retornará o extrato atualizado da conta especificada no parâmetro de consulta (numero_conta), a senha da conta também deve ser passada no parâmetro de consulta.
```
O extrato de todas as transações realizadas na conta especificada nos parâmetros será mostrado na resposta da requisição.

#### ⚠️ Importante: Este é um projeto de demonstração e não representa um sistema bancário real. Todas as operações são fictícias e apenas para fins educacionais.

###### tags: `back-end` | `nodeJS` | `API REST`

## Desenvolvedora

| [<img src="https://avatars.githubusercontent.com/u/118291210?v=4" width=40><br><sub>Raphaela Vidal</sub>](https://github.com/raphavidall) |
| :---:
