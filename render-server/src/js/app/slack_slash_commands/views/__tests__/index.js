import React from 'react'
import Index from '../index'

function createComponentWithValidProps() {
  const slackslashcommands = [
    {id: 1, name: 'slackslashcommand 1'},
    {id: 2, name: 'slackslashcommand 2'},
  ]

  return (
    <Index slackslashcommands={slackslashcommands} />
  )
}

describe('slackslashcommands view: index', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
