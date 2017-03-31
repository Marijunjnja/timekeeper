import React from 'react'
import Edit from '../edit'

function createComponentWithValidProps() {
  const slackslashcommand = {
    id: 1,
    name: 'slackslashcommand 1',
  }

  return (
    <Edit slackslashcommand={slackslashcommand} />
  )
}

describe('slackslashcommands view: edit', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
