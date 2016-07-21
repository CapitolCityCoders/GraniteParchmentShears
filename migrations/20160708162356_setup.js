exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.string('access_code');
      table.string('status');
      table.integer('user1_id');
      table.integer('user2_id');
      table.integer('user1_score');
      table.integer('user2_score');
      table.timestamps();
    }),
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.integer('game_id').references('id').inTable('games');
      table.string('imageUrl');
      table.string('name').unique();
      table.integer('score');
      table.integer('wins');
      table.integer('losses');
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
