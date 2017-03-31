import React from 'react'
import Form from '../Form'

function createComponentWithValidProps() {
  const slackslashcommand = {
    id: 1,
    name: 'slackslashcommand 1',
  }

  return (
    <Form slackslashcommand={slackslashcommand} />
  )
}

describe('slackslashcommands component: Form', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
