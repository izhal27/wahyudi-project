## Sample Project

Project sederhana ini dibuat untuk memenuhi permintaan bapak wahyudi

clone the project

install dependensi
```bash
$ npm install
```

run app with dev mode
```bash
$ npm run dev
```

##### server run at default port 3000

Bismillah happy coding.

set database config
buat file .env dengan isian sebagai berikut
```dosini
# Configurasi default mysql database
HOST=localhost
USERNAME=root
PASSWORD=my-secret-pw
DATABASE=
```

##### Config
```js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.HOST,
  dialect: "mysql",
  username: username,
  password: password,
  database: password,
  logging: false,
});
```