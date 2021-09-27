export const MULTITENANT = process.env.MULTITENANT
  ? Boolean(process.env.MULTITENANT) 
  : false

export const TABLE_NAMES = {
  MESSAGES: 'notifyer_messages'
}