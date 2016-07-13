
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.string('access_code', 4);
      table.string('status', 25);
      table.timestamps();
    }),
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.string('name', 25);
      table.string('player_status');
      table.string('game_id', 25).references('id').inTable('games');
      table.integer('score', 10);
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games'),
    knex.schema.dropTable('users')
  ])
};

// games=# CREATE TABLE games (id INT PRIMARY KEY, access_code VARCHAR(25),
//   status VARCHAR(75), p1_score INTEGER, p2_score INTEGER)