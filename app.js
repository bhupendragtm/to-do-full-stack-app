const express = require("express");
const app = express();
const port = 8001;
const client = require("./databasepg.js");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h1>Hello ${user}, Now You Can Create API Using Express1.<h1>`);
});

app.post("/todos", (request, response) => {
  const { title, description, users } = request.body;
  client.query(
    `INSERT INTO todos (title, description, users) VALUES ('${title}' , '${description}' , '${users}')`,
    (error, results) => {
      if (error) {
        throw error;
      }
      return response.status(200).json(results);
      console.log(results);
    }
  );
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello ${user}, Now You Can Create API Using Express1.<h1>`);
});

app.get("/todos", (request, response) => {
  client.query(`SELECT * FROM todos ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    // console.log(results.rows.length);
    response.status(200).json(results.rows);
    const count = results.rows.length;
  });
});

app.get("/todos/:id", (request, response) => {
  const id = parseInt(request.params.id);
  // client.query(`SELECT * FROM todos WHERE id = '${id}'
  client.query(`SELECT * FROM todos WHERE id = '${id}'`, (error, results) => {
    if (error) {
      throw error;
    }
    // console.log(results.rows.length);
    response.status(200).json(results.rows);
  });
});

app.put("/todos/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { title, description, users } = request.body;
  console.log(request.body);

  client.query(
    `UPDATE todos SET title = '${title}', description = '${description}' , users = '${users}'  WHERE id = '${id}' RETURNING * `,
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(results.rows);
      response.status(200).json(results.rows);
    }
  );
});

app.delete("/todos/:id", (request, response) => {
  const id = parseInt(request.params.id);
  client.query(`DELETE FROM todos WHERE id = '${id}'`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rowCount + ` Deleted id is: ${id} ` + results.rowCount);
    response.status(200).send(`Blog deleted with name TITLE: '${id}'   `);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
