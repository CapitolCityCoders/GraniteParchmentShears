
module.exports = {
   query: function(text, values, cb) {
      pg.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   }
}
//==================================

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://username:password@host:port/database");

db.one("SELECT $1 AS value", 123)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });


//==================================
var pg = require('pg');
var DATABASE_URL = 'postgres://localhost:5432/my-database-name';

function query(sql, params, cb) {
  pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) { 
      done(); // release client back to pool
      cb(err);
      return;
    }
    client.query(sql, params, cb);
  });
}

// returns user object if found, else returns undefined
exports.findUserById = function(id, cb) {
  var sql = `
    SELECT *
    FROM users
    WHERE id = $1
  `;

  query(sql, [id], function(err, result) {
    if (err) return cb(err);
    cb(null, result.rows[0]);
  });
};

// returns created user object
exports.insertUser = function(data, cb) {
  var sql = `
    INSERT INTO users (username, hashed_password)
    VALUES ($1, $2)
    RETURNING *  -- tells postgres to return the created user record to us
  `;

  bcrypt.hashPassword(data.password, function(err, hashedPassword) {
    if (err) return cb(err);
    query(sql, [data.username, hashedPassword], function(err, result) {
      if (err) return cb(err);
      cb(null, result.rows[0]);
    });
  });
};


//=======================================
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE games(id SERIAL PRIMARY KEY, access_code VARCHAR(75) not null, status VARCHAR(75), player1_score INTEGER, player_2 score INTEGER')
query.on('end', function() {client.end(); });