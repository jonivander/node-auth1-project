
exports.up = function(knex) {
  return knex.schema
  .createTable("users", tbl => {
    tbl.increments();

    tbl.string("username", 123)
        .notNullable()
        .unique()
        .index();
    tbl.string("password", 250)
        .notNullable();
  })
};

exports.down = function(knex) {
  
};
