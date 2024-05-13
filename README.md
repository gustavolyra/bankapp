# Project API Bank Account

An API to create bank account and make transations (Deposit, Withdraw and Transfer)

## Automated API Test
https://ipkiss.pragmazero.com

# How to run
 1- Dowload the repository
 
 2- start node
 ```
 npm install
 ```
 3- Start Database
```
docker-compouse up -d
```
4- Create a file with name .env, with two variables. Change "database_url" for your database url, or use the same in file .env.EXAMPLE.
```
  NODE_ENV=dev 
  DATABASE_URL="database_url" 
```

5-Migrations
 ```
npx prisma migrate dev
 ```
6-start the application
```
npm run start:watch
```

--------------------------------------------------
## API Documentation

### Erase database 
Request:
```http
  POST /reset
```
Returns: status code 200 OK.

--
####  Get Balance for Existing or Non-Existing Account

Request:
```http
  GET /balance?account_id=1234
```

| Parameter   | Tipo       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `account_id`      | `string` | The ID of the bank account |

Returns:
  <p>For Non-Existing Account: status code 404 0 </p>
  <p>For Existing Account: status code 200 and returns the balance </p>

--
#### Deposit Amount to Existing or Non-Existing Account

```http
  POST /event {"type":"deposit", "destination":"100", "amount":10}
```

| Parameter   | Tipo       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `type` | `string` |  Transaction type |
| `destination` | `string` | Bank account number|
| `amount` | `double` |  Transaction amount |

Returns {"destination": {"id":"100", "balance":10}} 201 OK.
<p>If bank account doesn't exist, create a new one with the informations send in the deposit request</p>

--
#### Withdraw Amount from Existing or Non-Existing Account

```http
  POST /event {"type":"withdraw", "origin":"100", "amount":5}
```

| Parameter   | Tipo       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `type`      | `string` |  Transaction type |
| `origin` | `string` |  Bank account number |
| `amount` | `double` |  Transaction amount |


Returns:
  - Existing Account: {"origin": {"id":"100", "balance":15}} 201
  - Non-Existing Account: 404 0.
  - Insufficient Funds: 402 and returns the balance

--
#### Transfer from Existing Account 

```http
  POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}
```

| Parameter   | Tipo       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `type`      | `string` |  Transaction type |
| `origin` | `string` | Sender's bank account number |
| `amount` | `double` | Transaction amount |
| `destination` | `string` |  Receiver's bank account number |

Returns:
  - Transfering from an Existing Account: {"origin": {"id":"100", "balance":0}, "destination": {"id":"300", "balance":15}} 201
  - Transfering from a Non-Existing Account: 404 0.

<p>If bank account destination doesn't exist, create a new one with the informations send in the deposit request</p>


---------------------------------------------------------
## Code Dependencies:
### Development Dependencies:
1. @types/node: Provides TypeScript type definitions for Node.js modules.
2. @vitest/ui: UI library or component library for Vite projects.
3. prisma: ORM tool simplifying database access in Node.js.
4. tsup: TypeScript module bundler for fast development workflows.
5. tsx: TypeScript JSX transformer for using JSX syntax.
6. typescript: Adds static typing to JavaScript.
7. vite-tsconfig-paths: Resolves module paths based on tsconfig.json.
8. vitest: Testing framework or library for Vite projects.

### Production Dependencies:
1. @prisma/client: Prisma client library for database access.
2. dotenv: Loads environment variables from .env files.
3. fastify: Web framework for building fast Node.js applications.
4. zod: TypeScript-first schema declaration and validation library.

----------------------------------------------------
## Automated Test Results


