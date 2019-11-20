const db = require('../data/db-config')

function find() {
    return db('schemes')
}

// function findById(id) {
//     return db('schemes').where({ id })
// }

function findById(id) {
    return db('schemes as sc')
        .join('steps as st', 'st.scheme_id', 'sc.id')
        .options({ nestTables: true })
        .where({ scheme_id: id })
        .then(res => {
            return {
                step: res.values(step_number),
                instruction: res.values(instructions)
            }
        })
}

function findSteps(id) {
    return db('steps as st')
        .join('schemes as sc', 'st.scheme_id', 'sc.id')
        .select('sc.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        .where({ scheme_id: id })
}

function add(scheme) {
    return db('schemes').insert(scheme)
}

function update(changes, id) {
    db('schemes').where({ id }).update(changes)
    return db('schemes').where({ id })
}

function remove(id) {
    db('schemes').where({ id }).del()
    return db('schemes').where({ id })
}


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}