exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.string('access_code');
      table.string('status');
      table.timestamps();
    }),
    knex.schema.createTable('users', function(table){
      table.varchar('id').primary();
      table.integer('game_id').references('id').inTable('games');
      table.string('name');
      table.string('email');
      table.string('photo_url');
      table.integer('score');
      table.string('status');
      table.string('room');
      table.timestamps();
    }),
    knex.schema.createTable('sessions', function(table){
      table.increments('id').primary();
      table.string('user_id').references('id').inTable('users');
      table.timestamps();
    }),
    knex.schema.createTable('challenges', function(table){
      table.increments('id').primary();
      table.string('game_id').references('id').inTable('games');
      table.string('challenger').references('id').inTable('users');
      table.string('challenged').references('id').inTable('users');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('sessions'),
    knex.schema.dropTable('challenges')
  ])
};
