import React from 'react'
import ListItem from '../ListItem'

function createComponentWithValidProps() {
  const slackslashcommand = {
    id: 1,
    name: 'slackslashcommand 1',
  }

  return (
    <ListItem slackslashcommand={slackslashcommand} />
  )
}

describe('slackslashcommands component: ListItem', () => {
  it('can shallow render with valid props', () => {
    shallow(createComponentWithValidProps())
  })
})
