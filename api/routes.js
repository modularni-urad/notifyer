import _ from 'underscore'
import Middleware from './middleware'
import filterIPs from './ipwhitelist'

export default (ctx) => {
  const { knex, auth, express, JSONBodyParser } = ctx
  const api = express()

  api.post('/', filterIPs, JSONBodyParser, (req, res, next) => {
    Middleware.create(req.body, req.orgconfig.orgid, knex)
      .then(data => res.json(data))
      .catch(next)
  })

  api.get('/', auth.session, (req, res, next) => {
    Middleware.list(req.user, req.orgconfig.orgid, knex)
      .then(data => res.json(data))
      .catch(next)
  })

  api.put('/:id', auth.session, auth.required, (req, res, next) => {
    Middleware.update(req.params.id, req.orgconfig.orgid, req.user.id, knex)
      .then(data => res.json(data))
      .catch(next)
  })

  return api
}