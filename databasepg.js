const { Pool } = require("pg");

const client = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "todo",
});

client.connect();

client.query(``, (err, res) => {
  if (!err) {
    console.log(res.rows + "Database Connected Successfully!");
  } else {
    console.log(err.message + +"Database Connection?");
  }
  client.end;
});

// console.log(client);
module.exports = client;
