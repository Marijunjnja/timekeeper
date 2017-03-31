import React from 'react'
import Show from '../show'

function createComponentWithValidProps() {
  const home = {
    id: 1,
    name: 'home 1',
  }

  return (
    <Show home={home} />
  )
}

describe('homes view: show', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
