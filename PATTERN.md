## Xlab Starter

**Encoding e identação**

- Encoding type = UTF-8.
- Espaçamento = 2 espaços.
- Aspas simples.
- Ponto e vírgula no final.

**Linguas**

- Variáveis, classes, nomes de arquivos, funções: Inglês.
- Comentários e documentações: Português.

**Pattern utilizado**

- MVC: Model, View, Controller

- Models: Pasta a ser utilizada no caso de uso de banco relacional.
- Schemas: Definição das colunas do banco de dados MongoDB.
- View: ReactJS front-end.
- Controller: Regras de negócio e persistencia de dados.
- Services: API's externas como Jsonwebtoken.

**Nomenclaturas para os arquivos**

- Models: CamelCaseToUpperCase

  - User.js
  - UserRelation.js

- Controllers: CamelCaseToUpperCase

  - UserController.js
  - SessionControlle.js

- Services: camelCase

  - passwordHashService.js

- Middlewares: camelCase

  - auth.js

- Schemas: CamelCaseToUpperCase
  - User.js

**Mais detalhes sobre Models, Controllers e Services**

- Controllers: Uso de classes.
- Models: Const, function ou classes (Usar um tipo ao longo do projeto)
- Services: Da maneira que a API documentar.

**Testes**

- Testes unitários

  - Define com o nome do controller e método a ser testado.
  - define('UserController Create').
  - Teste com a funcionalidade a ser testada.
  - it('should be able to create a new user').

- Testes de integração

  - Define com o nome da rota a ser testada.
  - define('/user/create').
  - Teste com a funcionalidade a ser testada.
  - it('should be able to create a new user')
