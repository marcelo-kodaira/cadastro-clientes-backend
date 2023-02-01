# cadastro-clientes-backend

## Tecnologias
Este sistema foi desenvolvido em Node.js utilizando as seguintes tecnologias:

- Biblioteca bcrypt para criptografia de senhas.
- Biblioteca jsonwebtoken (JWT) para autenticação de usuários.
- Framework Jest para realização de testes.
- Framework Express para criação de rotas e APIs REST.

## Endpoints
| Método | Endpoint | Responsabilidade | Autorização
| --- | --- | --- | --- |
| POST | /clients | Criação de cliente | 
| GET | /clients | Lista todos os cliente | 
| GET | /clients/contacts | Lista todos os contatos cadastrados pelo cliente |
| PATCH | /clients | Atualiza um cliente | Precisa estar logado |
| DELETE | /clients | Realiza o delete do cliente | Precisa estar logado |
| POST | /clients/login | Gera o token de autenticação |
| POST | /contacts | Cria um contato | Precisa estar logado |
| GET | /contacts/all | Lista todos os contatos cadastrados |
| PATCH | /contacts | Atualiza um contato | Precisa estar logado |
| DELETE | /contacts | Deleta um contato | Precisa estar logado |


## Requisições e retornos

### POST - /clients
Rota para criação de usuário com os seguintes dados:
- id: uuidv4.
- name: string
- email: string
- password: Deverá receber uma string mas armazenar uma hash gerada com o bcrypt
- createdAt: Gerado no momento da validação dos dados no formato Date
- updatedAt: Gerado no momento da validação dos dados no formato Date

A rota de criação retorna todos os dados, com exceção da hash de senha.
Não podem ser cadastrados dois usuário com o mesmo e-mail.

### GET - /clients
A rota  retorna todos os dados dos usuários, com exceção da hash de senha.

### PATCH - /users/<id>
Não é possível atualizar os campos id, isAdm e isActive.
Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

### DELETE - /users/<id>
A rota realiza um soft delete do usuário, alterando isActive para false.
A rota pode ser acessada apenas por administradores.
Não é possível realizar um soft delete de um usuário inativo.

### POST - /login
Rota de login recebendo email e password
O login valida se o usuário existe e valida se a senha está correta.

### POST - /categories
Rota para criação de categorias com os seguintes dados:
- name: string
- id: Não deve ser passado mas gerado no momento da validação dos dados, deve um uuidv4.
Não podem ser cadastradas duas categorias com o mesmo nome.
A rota pode ser acessada apenas por administradores.

### GET - /categories
Rota lista todas as categorias.
A rota não precisa de autenticação para ser acessada.

### GET - /categories/<id>
Rota lista todos os agendamentos de um imóvel.
A rota pode ser acessada apenas por administradores.
