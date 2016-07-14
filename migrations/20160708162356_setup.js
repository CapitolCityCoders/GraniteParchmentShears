exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.string('access_code');
      table.string('status');
      table.timestamps();
    }),
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
<<<<<<< 5348a897e22ca6df8f6faf181c946d9517db39cd
      table.string('game_id').references('id').inTable('games');
      table.string('name');
      table.integer('score');
      table.string('status');
=======
      table.string('name', 25);
      table.string('player_status');
      table.string('game_id', 25).references('id').inTable('games');
      table.integer('score', 10);
>>>>>>> making progress testing knex syntax, force inserted in local database
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
