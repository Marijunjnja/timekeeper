import {createStore} from 'redux'
import reducer from '../home'

describe('homes state: home', () => {
  let store = null

  beforeEach(() => {
    store = createStore(reducer)
  })

  it('has the correct initial state', () => {
    expect(store.getState()).to.eql({})
  })
})
