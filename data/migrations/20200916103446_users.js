
exports.up = function(knex) {
  return knex.schema
  .createTable("users", tbl => {
    tbl.increments();
    tbl.string('name', 250)
        .notNullable()
        .unique();
  })
};

exports.down = function(knex) {
  
};
