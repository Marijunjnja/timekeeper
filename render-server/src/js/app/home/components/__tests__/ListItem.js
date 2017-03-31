import React from 'react'
import ListItem from '../ListItem'

function createComponentWithValidProps() {
  const home = {
    id: 1,
    name: 'home 1',
  }

  return (
    <ListItem home={home} />
  )
}

describe('homes component: ListItem', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
