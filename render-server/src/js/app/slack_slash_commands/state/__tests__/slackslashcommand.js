import {createStore} from 'redux'
import reducer from '../slackslashcommand'

describe('slackslashcommands state: slackslashcommand', () => {
  let store = null

  beforeEach(() => {
    store = createStore(reducer)
  })

  it('has the correct initial state', () => {
    expect(store.getState()).to.eql({})
  })
})
