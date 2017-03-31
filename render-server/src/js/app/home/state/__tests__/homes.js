import {createStore} from 'redux'
import reducer from '../homes'

describe('homes state: homes', () => {
  let store = null

  beforeEach(() => {
    store = createStore(reducer)
  })

  it('has the correct initial state', () => {
    expect(store.getState()).to.eql([])
  })
})
