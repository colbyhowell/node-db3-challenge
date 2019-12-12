const db = require('../data/db-config')

// function find() {
//     return db('schemes')
// }

function find() {
    return db('schemes')
        .then(schemes => {
            return db('steps')
                .then(steps => {
                    return schemes.map(scheme => {
                        const schemeSteps = []
                        steps.map(step => {
                            if (scheme.id === step.scheme_id) {
                                schemeSteps.push(step)
                            }
                        })
                        scheme.steps = schemeSteps
                        return scheme
                    })
                })
        })
}


// function findById(id) {
//     return db('schemes').where({ id })
// }

function findById(id) {
    return db('schemes')
        .where({ id }).first()
        .then(res => {
            return db('steps')
                .where({ scheme_id: id })
                .orderBy('step_number')
                .then(steps => {
                    res.colby = steps
                    return res
                })
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