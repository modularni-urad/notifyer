import _ from 'underscore'

export const ALLOWEDIPS = process.env.ALLOWED_IPS
  ? process.env.ALLOWED_IPS.split(',')
  : ['127.0.0.1']

export default function _allowedIPs (req, res, next) {
  return _.contains(ALLOWEDIPS, req.ip) ? next() : next(401)
}