import {createStore} from 'redux'
import reducer from '../slackslashcommands'

describe('slackslashcommands state: slackslashcommands', () => {
  let store = null

  beforeEach(() => {
    store = createStore(reducer)
  })

  it('has the correct initial state', () => {
    expect(store.getState()).to.eql([])
  })
})
