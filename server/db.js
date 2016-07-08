//  POSTGRES IMPLEMENTATION

// var pg = require('pg');
// var DATABASE_URL = 'postgres://localhost:5432/my-database-name';



// function query(sql, params, cb) {
//   pg.connect(DATABASE_URL, function(err, client, done) {
//     if (err) { 
//       done(); // release client back to pool
//       cb(err);
//       return;
//     }
//     client.query(sql, params, cb);
//   });
// }

// // returns game when status sent to ready (long pull completed)
// exports.findUserById = function(id, cb) {
//   var sql = `
//     SELECT *
//     FROM games
//     WHERE status = ready 
//   `;

//   query(sql, [id], function(err, result) {
//     if (err) return cb(err);
//     cb(null, result.rows[0]);
//   });
// };

// // ideal implementation of node-postgress
// module.exports = {
//    query: function(text, values, cb) {
//       pg.connect(function(err, client, done) {
//         client.query(text, values, function(err, result) {
//           done();
//           cb(err, result);
//         })
//       });
//    }
// }


// ///
// add User
//   -each user tied to game IDs
  
// game table
//   -each unique game 1 access code


// CREATE GAME
// 1 =- insert into game table
//     -acess code, (will be new incrementing)
//       on success
//       returns game ID 
//     - set status to waiting
// 2 =- insert into user table
//     - user with FK game's id 

// JOIN GAME
// 1 =- queries games table to check if access code exists
//     - if so, grabs game id from match

// 2=- insert into User table with game ID it found


