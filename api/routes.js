import _ from 'underscore'
import Middleware from './middleware'
import filterIPs from './ipwhitelist'

export default (ctx) => {
  const { knex, auth, express, bodyParser } = ctx
  const api = express()

  api.post('/', filterIPs, bodyParser, (req, res, next) => {
    Middleware.create(req.body, knex, req.tenantid)
      .then(data => res.json(data))
      .catch(next)
  })

  api.get('/', auth.session, (req, res, next) => {
    Middleware.list(req.user, knex, req.tenantid)
      .then(data => res.json(data))
      .catch(next)
  })

  api.put('/:id', auth.session, auth.required, (req, res, next) => {
    Middleware.update(req.params.id, req.user.id, knex, req.tenantid)
      .then(data => res.json(data))
      .catch(next)
  })

  return api
}