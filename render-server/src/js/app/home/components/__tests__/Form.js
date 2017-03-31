import React from 'react'
import Form from '../Form'

function createComponentWithValidProps() {
  const home = {
    id: 1,
    name: 'home 1',
  }

  return (
    <Form home={home} />
  )
}

describe('homes component: Form', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
