export const TABLE_NAMES = {
  MESSAGES: 'notifyer_messages'
}

export function getQB (knex, tablename, schema) {
  return schema
    ? knex(knex.ref(tablename).withSchema(schema))
    : knex(tablename)
}