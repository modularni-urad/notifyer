import _ from 'underscore'
import { MULTITENANT, TABLE_NAMES } from '../consts'

function setupMultitenantID (table) {
  table.integer('id').notNullable()
  table.integer('orgid').notNullable()
  table.primary(['id', 'orgid'])
}

exports.up = (knex, Promise) => {
  return knex.schema.createTable(TABLE_NAMES.MESSAGES, (table) => {
    MULTITENANT 
      ? setupMultitenantID(table) 
      : table.increments('id').primary()
    table.string('content', 64).notNullable()
    table.string('uid').notNullable()
    table.string('type', 16).notNullable()
    table.string('data', 64).notNullable()
    table.timestamp('noticed')
    table.timestamp('created').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(TABLE_NAMES.MESSAGES)
}
