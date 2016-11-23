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



function addPerson (firstname, lastname, birthdate) {
  knex.insert({
    first_name: firstname,
    last_name: lastname,
    birthdate: birthdate
  })
  .into('famous_people')
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
  })
  console.log('done!');
};

addPerson(firstName, lastName, birthDate);
