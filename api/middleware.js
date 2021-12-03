import _ from 'underscore'
import { TABLE_NAMES, getQB } from '../consts'

export default { create, list, update }

function list (user, knex, schema) {
  if (! user) return new Promise(resolve => resolve([]))
  return getQB(knex, TABLE_NAMES.MESSAGES, schema)
    .where({ uid: user.id }).whereNull('noticed')
}

async function create(body, knex, schema) {
  return getQB(knex, TABLE_NAMES.MESSAGES, schema).insert(body).returning('*')
}

function update(id, uid, knex, schema) {
  const cond = { id, uid }  
  return getQB(knex, TABLE_NAMES.MESSAGES, schema).where(cond)
    .update({ noticed: new Date() })
}