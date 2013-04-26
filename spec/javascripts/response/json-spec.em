describe 'Em.Auth.Response.Json', ->
  auth    = null
  adapter = null

  beforeEach ->
    Em.run ->
      auth    = Em.Auth.create { responseAdapter: 'json' }
      adapter = auth._response.adapter
  afterEach ->
    auth.destroy() if auth
    auth = null

  describe '#canonicalize', ->

    it 'works with object', ->
      expect(adapter.canonicalize { foo: 'bar' }).toEqual { foo: 'bar' }

    it 'works with JSON string', ->
      expect(adapter.canonicalize '{"foo":"bar"}').toEqual { foo: 'bar' }

    it 'throws on invalid JSON', ->
      expect(-> adapter.canonicalize 'foo').toThrow()
