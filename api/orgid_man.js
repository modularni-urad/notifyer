import { MULTITENANT } from '../consts'

const MAPPING = {

}

function getOrgID (req) {
  const domain = process.env.DOMAIN || req.hostname
  req.orgid = MAPPING[domain]
  return req.orgid !== undefined
}

export default function _loadOrgID (req, res, next) {
  return MULTITENANT 
    ? getOrgID(req) ? next() : next(404)
    : next() 
}