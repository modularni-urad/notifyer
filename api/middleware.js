import _ from 'underscore'
import { TABLE_NAMES, MULTITENANT } from '../consts'

export default { create, list, update }

function list (uid, orgid, knex) {
  const cond = MULTITENANT ? { uid, orgid } : { uid }
  return knex(TABLE_NAMES.MESSAGES).where(cond).whereNull('noticed')
}

function create(body, orgid, knex) {
  const data = MULTITENANT ? Object.assign(body, { orgid }) : body
  return knex(TABLE_NAMES.MESSAGES).insert(data).returning('*')
}

function update(id, orgid, uid, knex) {
  const cond = { id, uid }
  MULTITENANT && Object.assign(cond, { orgid })
  return knex(TABLE_NAMES.MESSAGES).where(cond).update({ noticed: new Date() })
}