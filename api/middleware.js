import _ from 'underscore'
import { TABLE_NAMES, MULTITENANT } from '../consts'

export default { create, list, update }

function list (user, orgid, knex) {
  if (! user) return []
  const uid = user.id
  const cond = MULTITENANT ? { uid, orgid } : { uid }
  return knex(TABLE_NAMES.MESSAGES).where(cond).whereNull('noticed')
}

async function _nextID (orgid, knex) {
  const m = await knex(TABLE_NAMES.MESSAGES).max('id as a').where({ orgid })
  return m.length && m[0].a ? m[0].a + 1 : 1
}

async function create(body, orgid, knex) {
  const id = MULTITENANT ? await _nextID(orgid, knex) : null
  MULTITENANT && Object.assign(body, { orgid, id })
  return knex(TABLE_NAMES.MESSAGES).insert(body).returning('*')
}

function update(id, orgid, uid, knex) {
  const cond = { id, uid }
  MULTITENANT && Object.assign(cond, { orgid })
  return knex(TABLE_NAMES.MESSAGES).where(cond).update({ noticed: new Date() })
}