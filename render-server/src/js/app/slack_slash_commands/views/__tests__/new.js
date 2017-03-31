import React from 'react'
import New from '../new'

function createComponentWithValidProps() {
  const slackslashcommand = {
    id: 1,
    name: 'slackslashcommand 1',
  }

  return (
    <New slackslashcommand={slackslashcommand} />
  )
}

describe('slackslashcommands view: new', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
