exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.string('access_code');
      table.string('status');
      table.integer('user1_id');
      table.integer('user2_id');
      table.integer('winner');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.integer('game_id').references('id').inTable('games');
      table.string('imageUrl');
      table.string('name').unique();
      table.integer('score');
      table.integer('wins');
      table.integer('losses');
      table.integer('rock');
      table.integer('paper');
      table.integer('scissors');
      table.string('status');
      table.timestamps();
    }),
    knex.schema.createTable('messages', function(table){
      table.string('imgUrl');
      table.string('name');
      table.string('message');
      table.string('time');
      table.integer('messageCount');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games'),
    knex.schema.dropTable('users')
  ])
};
