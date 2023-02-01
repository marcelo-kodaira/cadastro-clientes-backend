# cadastro-clientes-backend

## Tecnologias
Este sistema foi desenvolvido em Node.js utilizando as seguintes tecnologias:

- Biblioteca bcrypt para criptografia de senhas.
- Biblioteca jsonwebtoken (JWT) para autenticação de usuários.
- Framework Jest para realização de testes.
- Framework Express para criação de rotas e APIs REST.

## URL
https://cadastro-clientes-backend-production.up.railway.app

## Endpoints
| Método | Endpoint | Responsabilidade | Autorização
| --- | --- | --- | --- |
| POST | /clients | Criação de cliente | 
| GET | /clients | Lista todos os cliente | 
| GET | /clients/contacts | Lista todos os contatos cadastrados pelo cliente | Precisa estar logado |
| PATCH | /clients | Atualiza um cliente | Precisa estar logado |
| DELETE | /clients | Realiza o delete do cliente | Precisa estar logado |
| POST | /clients/login | Gera o token de autenticação |
| POST | /contacts | Cria um contato | Precisa estar logado |
| GET | /contacts/all | Lista todos os contatos cadastrados | Precisa ser Administrador |
| PATCH | /contacts/<:id> | Atualiza um contato | Precisa estar logado |
| DELETE | /contacts/<:id> | Deleta um contato | Precisa estar logado |


## Requisições e retornos

### POST - /clients
Rota para criação de usuário com os seguintes dados:
- id: uuidv4.
- name: string
- email: string
- senha: Deverá receber uma string mas armazenar uma hash gerada com o bcrypt
- createdAt: Gerado no momento da validação dos dados no formato Date
- updatedAt: Gerado no momento da validação dos dados no formato Date

A rota de criação retorna todos os dados, com exceção da hash de senha.
Não podem ser cadastrados dois usuário com o mesmo e-mail.

### GET - /clients
A rota  retorna todos os dados dos usuários, com exceção da hash de senha.

### GET - /clients/contacts
A rota  retorna todos os dados dos contatos associados aquele cliente.
Paginação: a rota conta com sistema de paginação por parametro, possuindo page, e pagesize, se não passados os valores default são 1 e 60 respectivamente.

### PATCH - /clients
A rota permite alterar os dados do cliente logado.

### DELETE - /clients
A rota permite deletar o cliente logado.

### POST - /clients/login
Rota de login recebendo email e password
O login valida se o usuário existe e valida se a senha está correta.

### POST - /contacts
Rota para criação de um contato relacionado ao cliente logado com os seguintes dados:
- id: uuidv4.
- name: string
- email: string
- createdAt: Gerado no momento da validação dos dados no formato Date
- updatedAt: Gerado no momento da validação dos dados no formato Date

### GET - /contacts/all
Rota lista todas as contatos cadastrados

### GET - /contacts/patch
Rota permite ao usuário logado alterar informações dos seus contatos.

### GET - /contacts/delete
Rota permite ao usuário logado deletar seus contatos.
