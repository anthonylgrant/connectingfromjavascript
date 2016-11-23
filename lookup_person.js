const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: settings.ssl
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];


function dateUpdater(date) {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let fixedDate = year + "-" + month + "-" + day;
  return fixedDate;
}

var input = process.argv[2];


knex.select('first_name', 'last_name', 'birthdate')
.from('famous_people')
.where('first_name', input)
.orWhere('last_name', input)
.asCallback(function(err, rows) {
  if (err) {
  return console.log(err);
  } else {
    var niceDate = dateUpdater(rows[0].birthdate)
    console.log(`Searching...`)
    console.log(`Found 1 persons(s) by the name ${input}:`)
    console.log(` - 1: ${rows[0].first_name} ${rows[0].last_name}, born '${niceDate}'.`)
  }
knex.destroy(function() {
console.log("Connection closed.");
});
});



