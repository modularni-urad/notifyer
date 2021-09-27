import _ from 'underscore'
import Middleware from './middleware'
import loadOrgID from './orgid_man'
import filterIPs from './ipwhitelist'

export default (ctx) => {
  const { knex, auth, express } = ctx
  const JSONBodyParser = express.json()
  const app = express()

  app.post('/', filterIPs, loadOrgID, JSONBodyParser, (req, res, next) => {
    Middleware.create(req.body, req.orgid, knex)
      .then(data => res.json(data))
      .catch(next)
  })

  app.get('/', loadOrgID, auth.required, (req, res, next) => {
    Middleware.list(req.user.id, req.orgid, knex)
      .then(data => res.json(data))
      .catch(next)
  })

  app.put('/:id', loadOrgID, auth.required, (req, res, next) => {
    Middleware.update(req.params.id, req.orgid, req.user.id, knex)
      .then(data => res.json(data))
      .catch(next)
  })

  return app
}