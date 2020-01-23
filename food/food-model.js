const db = require("../data/config");

function list() {
  return db("food");
}

function findById(id) {
  return db("food")
    .where({ id })
    .first();
}

async function insert(food) {
  const ids = await db("food").insert(food);
  return findById(ids[0]);
}

async function update(id, changes) {
  await db("food")
    .where({ id })
    .update(changes);

  return findById(id);
}

function remove(id) {
  return db("food")
    .where({ id })
    .del();
}

module.exports = {
  list,
  findById,
  insert,
  update,
  remove
};
