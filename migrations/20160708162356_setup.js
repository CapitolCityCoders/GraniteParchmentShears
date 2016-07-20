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
      table.integer('game_id').references('id').inTable('games');
      table.string('imageUrl');
      table.string('name');
      table.integer('score');
      table.string('status');
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
