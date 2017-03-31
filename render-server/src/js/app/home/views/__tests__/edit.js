import React from 'react'
import Edit from '../edit'

function createComponentWithValidProps() {
  const home = {
    id: 1,
    name: 'home 1',
  }

  return (
    <Edit home={home} />
  )
}

describe('homes view: edit', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
