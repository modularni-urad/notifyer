import { TABLE_NAMES } from '../consts'

function tableName (tname) {
  return process.env.CUSTOM_MIGRATION_SCHEMA 
    ? `${process.env.CUSTOM_MIGRATION_SCHEMA}.${tname}`
    : tname
}

exports.up = (knex, Promise) => {
  return knex.schema.createTable(tableName(TABLE_NAMES.MESSAGES), (table) => {
    table.increments('id').primary()
    table.string('content', 64).notNullable()
    table.string('uid').notNullable()
    table.string('type', 16).notNullable()
    table.string('data', 64).notNullable()
    table.timestamp('noticed')
    table.timestamp('created').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(tableName(TABLE_NAMES.MESSAGES))
}
