module.exports = (g) => {
  //
  const r = g.chai.request(g.baseurl)
  const _ = g.require('underscore')
  const p = {
    content: 'new taskman item',
    type: 'new',
    data: 'taskman/43'
  }

  return describe('messages', () => {
    before(done => {
      p.uid = g.mockUser.id
      done()
    })
    //
    // it('must not create a new item wihout auth', async () => {
    //   const res = await r.post('/').send(p)
    //   res.should.have.status(400)
    // })

    it('shall create a new item pok1', async () => {
      const res = await r.post('/').send(p)
      res.should.have.status(200)
      res.should.have.header('content-type', /^application\/json/)
    })

    it('shall get message list', async () => {
      const res = await r.get('/').set('Authorization', 'Bearer f')
      res.should.have.status(200)
      res.body.length.should.eql(1)
      res.body[0].content.should.eql(p.content)
      p.id = res.body[0].id
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
      const another = Object.assign({}, _.omit(p, 'id'), { content: 'anohter' })
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
