import React from 'react'
import New from '../new'

function createComponentWithValidProps() {
  const home = {
    id: 1,
    name: 'home 1',
  }

  return (
    <New home={home} />
  )
}

describe('homes view: new', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
