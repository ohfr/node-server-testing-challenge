
exports.up = function(knex) {
  return knex.schema.createTable("animals", tbl => {
      tbl.increments();

      tbl.string("Name", 128).notNullable();
      tbl.string("Species", 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("animals");
};
