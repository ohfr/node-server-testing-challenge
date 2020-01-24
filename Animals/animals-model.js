const db = require("../data/config");

const find = () => {
    return db("animals").select();
}

const findById = (id) => {
    return db("animals").where({id}).first();
}

const findBy = (filter) => {
    return db("animals").where(filter).first();
}

const remove = (id) => {
    return db("animals").where({id}).del();
}

const update = async (id, changes) => {
    const newId = await db("animals").where({id}).update(changes);

    return findById(newId);
}

const add = async (animal) => {
    const [id] = await db("animals").insert(animal);

    return findById(id);
}

module.exports = {
    find,
    findById,
    findBy,
    add,
    remove,
    update,
}