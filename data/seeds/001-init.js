exports.seed = function (knex) {

  const users = [
    {
      id: 1,
      username: "admin", 
      password: "passmot"
    },
    {
      id: 2,
      username: "passenger", 
      password: "passengerseat"
    }
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
