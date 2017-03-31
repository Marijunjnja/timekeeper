import React from 'react'
import Show from '../show'

function createComponentWithValidProps() {
  const slackslashcommand = {
    id: 1,
    name: 'slackslashcommand 1',
  }

  return (
    <Show slackslashcommand={slackslashcommand} />
  )
}

describe('slackslashcommands view: show', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
