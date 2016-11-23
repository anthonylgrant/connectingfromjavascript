const pg = require("pg");
const settings = require("./settings"); //settings.json
const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
})

console.log(client.database);

const input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
    console.log("client is connecting!");
  }
  // client.query("SELECT $1::int AS number", ["1"], (err, result) => {
  //   if (err) {
  //     return console.error("error running query, err");
  //   }
  //   console.log(result.rows[0].number); //output: 1
  //   client.end();
  // });
  client.query('SELECT * FROM famous_people WHERE last_name = $1::text;', [input], (err, result) => {
    if (err) {
      return console.error("error running query, err");
    }
    console.log(result.rows); //output: 1
    client.end();
  });
});