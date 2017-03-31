import React, {PropTypes} from 'react'
import Button from 'revelry-components/lib/Button'
import Layout from 'app/shared/components/Layout'
import ListItem from '../components/ListItem'
import shape from '../shape'

function renderListItem(slackslashcommand) {
  const {id} = slackslashcommand

  return (
    <ListItem
      key={id}
      slackslashcommand={slackslashcommand}
    />
  )
}

export default function Index({slackslashcommands}) {
  return (
    <Layout>
      <h1>slackslashcommands</h1>
    </Layout>
  )
}

Index.propTypes = {
  slackslashcommands: PropTypes.arrayOf(PropTypes.shape(shape)).isRequired,
}
