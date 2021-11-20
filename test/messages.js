/* global describe it */
import moment from 'moment'
import _ from 'underscore'
const chai = require('chai')
chai.should()

module.exports = (g) => {
  //
  const r = chai.request(g.baseurl + '/api.domain1.cz')
  const p = {
    content: 'new taskman item',
    uid: '42',
    type: 'new',
    data: 'taskman/43'
  }

  return describe('messages', () => {
    //
    // it('must not create a new item wihout auth', async () => {
    //   const res = await r.post('/').send(p)
    //   res.should.have.status(400)
    // })

    it('shall create a new item pok1', async () => {
      const res = await r.post('/').send(p)
      res.should.have.status(200)
      res.should.have.header('content-type', /^application\/json/)
      p.id = res.body[0]
    })

    it('shall get message list', async () => {
      const res = await r.get('/').set('Authorization', 'Bearer f')
      res.body.length.should.eql(1)
      res.body[0].content.should.eql(p.content)
      res.should.have.status(200)
    })

    it('shall notice item', async () => {
      const res = await r.put(`/${p.id}`).set('Authorization', 'Bearer f')
      res.should.have.status(200)
    })

    it('shall get message list', async () => {
      const res = await r.get('/').set('Authorization', 'Bearer f')
      res.should.have.status(200)
      res.body.length.should.eql(0)
    })

    it('shall create another', async () => {
      const another = Object.assign({}, p, { content: 'anohter' })
      const res = await r.post('/').send(another)
      res.should.have.status(200)
    })

    it('shall get message list again', async () => {
      const res = await r.get('/').set('Authorization', 'Bearer f')
      res.should.have.status(200)
      res.body.length.should.eql(1)
    })

  })
}
