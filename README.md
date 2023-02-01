<p align="center">
  <img style="width: 180px; height: 180px" src="https://pbs.twimg.com/profile_images/2621618808/DoubleBicepPose-180x180_400x400.png">
</p>
<h1 align="center">
  Fitness Evo
</h1>
<div align="center">

  <h3>Desenvolvido utilizando</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Descrição

Fitness Evo é uma aplicação para cálculo de macronutrientes diários por meio dos objetivos individuais do usuário e para gestão de dieta.

</br>

## Funcionalidades

-   Cadastro e Login
-   Inserir / Alterar / Buscar informações adicionais do usuário
-   Inserir uma nova tabela nutricional de um alimento
-   Votar a favor de / contra uma tabela nutricional
-   Registrar alimento nas refeições realizadas do dia
-   Buscar o sumário de refeições e macronutrientes do dia

</br>

## Referência da API

### Cadastro

```http
POST /sign-up
```

#### Requisição:

| Body      | Type      | Descrição           |
| :---------- | :-------- | :-------------------- |
| `name` | `string` |  Nome desejado para cadastro|
| `email` | `string` |  E-mail de cadastro|
| `password` | `string` |  Senha com no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número|

##### Exemplo:

```json
{
  "name": "Big Bolado",
  "email": "boladao12memo@anilhas.com",
  "password": "Eusoubolado100kg"
}
```

### Login

```http
POST /sign-in
```

#### Requisição:

| Body      | Type      | Descrição           |
| :---------- | :-------- | :-------------------- |
| `email` | `string` |  E-mail de cadastrado anteriormente|
| `password` | `string` |  Senha compatível com o e-mail cadastrado|

##### Exemplo:

```json
{
  "email": "boladao12memo@anilhas.com",
  "password": "Eusoubolado100kg"
}
```

#### Resposta:

```json
{
  "email": "boladao12memo@anilhas.com",
  "token": "eyJhbGc...HO6mD8M",
  "name": "Big Bolado"
}
```

### Inserir informações adicionais do usuário

```http
POST /users/infos
```

#### Requisição:

| Body         | Type     | Descrição                              |
| :------------| :------- | :--------------------------------------- |
| `sex` | `string`| Representa o sexo de nascimento                 |
| `age`  | `integer`| Idade do usuário  |
| `weight`       | `integer` | Peso do usuário multiplicado por 10 |
| `height` | `integer`| Altura do usuário em centímetros |
| `activityLevel`  | `string`| Nível de atividade, deve ser uma das opções: "sedentary", "lightly_active", "active", "very_active", "extremely_active"|
| `trainingExperience`       | `string` | Nível de experiência de treino, opções: "beginner", "intermediate", "advanced", "athlete"|
| `objective`       | `string` | Objetivo de treino do usuário, opções: "fat_loss", "maintenance", "mass_gain"|
| `bodyFat`       | `integer` | Parâmetro opcional que caso o usuário tenha conhecimento, melhora a precisão do cálculo das metas de macronutrientes|

####

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

####

</br>

#### Resposta:

```json
{
  "userId": 3,
  "sex": "male",
  "age": 26,
  "weight": 920,
  "height": 188,
  "activityLevel": "very_active",
  "trainingExperience": "advanced",
  "objective": "fat_loss",
  "calorieGoal": 2994,
  "proteinGoal": 258,
  "carbohydrateGoal": 387,
  "fatGoal": 46
}
```
-   Obs.: a resposta traz as informações inseridas no banco somado às metas diárias, por conta disso, 'weight' vem multiplicado por 10.

#

### Alterar informações do usuário

```http
PUT /users/infos
```

#### Funciona exatamente como a rota de inserir informações do usuário, apenas mudando o método para PUT

### Buscar informações do usuário

```http
GET /users/infos
```

#### Requisição:

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

#### Resposta:

```json
{
  "id": 1,
  "userId": 3,
  "sex": "male",
  "age": 26,
  "weight": 920,
  "height": 188,
  "activityLevel": "very_active",
  "objective": "fat_loss",
  "bodyFat": null,
  "trainingExperience": "advanced",
  "calorieGoal": 2994,
  "proteinGoal": 258,
  "carbohydrateGoal": 387,
  "fatGoal": 46
}
```

### Inserir tabela nutricional de um alimento

```http
POST /foods
```

#### Requisição:

| Body             | Type     | Descrição                        |
| :--------------- | :------- | :--------------------------------- |
| `name`         | `string`| Nome do alimento |
| `portionAmount`       | `integer` | Quantidade da porção base da tabela em gramas |
| `calories`       | `integer` | Quantidade de kcal da porção |
| `protein`       | `number` | Quantidade de proteína da porção, podendo conter casas decimais |
| `carbohydrate`       | `number` | Quantidade de carbohidratos da porção, podendo conter casas decimais |
| `fat`       | `number` | Quantidade de gordura da porção, podendo conter casas decimais |

####

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

#### Resposta:

```json
{
  "id": 5,
  "name": "Frango desfiado",
  "calories": 134,
  "protein": 25,
  "carbohydrate": 0,
  "fat": 3.75,
  "votes": 0
}
```

-   Obs.: o retorno é baseado em porções corrigidas para 100g


### Buscar tabela nutricional

```http
GET /foods/{parte do nome do alimento}
```

#### Request:

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

#### Resposta:

```json

[
  {
    "id": 2,
    "name": "Frango desfiado",
    "calories": 134,
    "protein": 25,
    "carbohydrate": 0,
    "fat": 3.75,
    "votes": 2
  },
    {
    "id": 3,
    "name": "Frango desfiado",
    "calories": 134,
    "protein": 25,
    "carbohydrate": 0,
    "fat": 3.75,
    "votes": 1
  }
]
```

-   Obs.: a resposta vem ordenada por número de votos

### Votar a favor de uma tabela nutricional

```http
POST /foods/upvote/{id do alimento}
```
#### Request:

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

-   Obs.: só é possível dar um voto por tabela por pessoa

### Votar contra uma tabela nutricional

```http
POST /foods/downvote/{id do alimento}
```
#### Request:

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

-   Obs.: só é possível dar um voto por tabela por pessoa

### Registrar uma refeição

```http
POST /meals
```

#### Request:

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `foodId`         | `integer` | Id do alimento a adicionar na refeição           |
| `amount` | `integer`  | Quantidade da porção em gramas    |

####

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

#### Resposta:

```json
{
  "id": 18,
  "userId": 3,
  "foodId": 2,
  "amount": 170,
  "date": "2023-01-31T20:55:54.852Z"
}
```

### Buscar sumário de refeições realizadas no dia atual

```http
GET /meals
```

#### Request:

| Headers     | Type     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | Campo de autenticação de rota no cabeçalho onde deve ser utilizado o modelo Bearer token |

#### Resposta:

```json
{
  "meals": [
    {
      "name": "Frango desfiado",
      "amount": 170,
      "calories": 134,
      "protein": 25,
      "carbohydrate": 0,
      "fat": 3.75
    }
  ],
  "mealsTotalMacros": {
    "calories": 134,
    "protein": 25,
    "carbohydrate": 0,
    "fat": 3.75
  }
}
```

## Variáveis de ambiente

Para rodar este proeto, você deverá adicionar as seguintes variáveis de ambiente ao seu arquivo .env

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number`

`JWT_SECRET="Qualquer frase ou valor"`

`CRYPTR_SECRET="Qualquer frase ou valor"`

`SALT= {numero de 1 a 12, quanto maior, mais encriptados ficarão os dados sensíveis}`

</br>

## Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/andrezopo/fitnessEvo-back
```

Vá ao repositório do projeto

```bash
  cd fitnessEvo-back/
```

Instale as dependências

```bash
  npm install
```

Crie a build do projeto

```bash
  npx tsc
```

Inicie o servidor

```bash
  npm start
```

</br>

## Divirta-se e vamos pra cima!

</br>

## Reconhecimentos

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Autor

-   André Zopolato é um apaixonado por programação e bodybuilding que está em busca de sua primeira vaga profissional como desenvolvedor.
<br/>

#

