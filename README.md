# Express Message Board

![NodeJS shield](https://img.shields.io/badge/nodejs-339933?logo=nodedotjs&logoColor=white&link=https%3A%2F%2Fnodejs.org%2F)
![Express shield](https://img.shields.io/badge/express-black?logo=express&logoColor=white&link=https%3A%2F%2Fnodejs.org%2F)
![Mongoose shield](https://img.shields.io/badge/mongoose-880000?logo=mongoose&logoColor=white&link=https%3A%2F%2Fnodejs.org%2F)
![TS shield](https://img.shields.io/badge/typescript-3178C6?logo=typescript&logoColor=white&link=https%3A%2F%2Fnodejs.org%2F)

Simple message board using serverside rendering via ejs that allows users to write messages on a public board.

## Getting Started

As a prerequisite you must either have [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed locally or have an MongoDB Atlas account (you can create one for free [here](https://www.mongodb.com/cloud/atlas/register)).

After that clone the repository locally (if you havent already):

```bash
git clone git@github.com:MisterRooster/web-dev-samples.git
```

Then move to the project directory and install dependencies:

```bash
cd web-dev-samples/express-message-board
npm install
```

Now create an environment configuration file named `.env` at the root of the project and add your cluster connection string uri (replace your username and password):

```bash
DB_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/
```

For a local MongoDB installation the string looks like the following (no authentication needed, must have a replica set):

```bash
DB_URI=mongodb://127.0.0.1:27017
```

Then start the program with the following command:

```bash
npm start
```

If you want a development server with HMR:

```bash
npm run dev
```

---

Copyright (c) 2023 MisterRooster ([github.com/MisterRooster](https://github.com/MisterRooster)). All rights reserved.  
Licensed under the MIT license. See [LICENSE](LICENSE) for full terms.
