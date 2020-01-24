
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('animals').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {Name: "Johnny", Species: "Elephant"},
        {Name: "Charles", Species: "Tiger"},
        {Name: "George", Species: "Monkey"}
      ]);
    });
};
