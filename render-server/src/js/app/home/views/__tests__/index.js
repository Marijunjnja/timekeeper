import React from 'react'
import Index from '../index'

function createComponentWithValidProps() {
  const homes = [
    {id: 1, name: 'home 1'},
    {id: 2, name: 'home 2'},
  ]

  return (
    <Index homes={homes} />
  )
}

describe('homes view: index', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
