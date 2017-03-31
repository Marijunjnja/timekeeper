import React, {PropTypes} from 'react'
import Button from 'revelry-components/lib/Button'
import Layout from 'app/shared/components/Layout'
import Callout from 'revelry-components/lib/Callout'
import shape from '../shape'

export default function Show({slackslashcommand}) {
  const {id} = slackslashcommand

  return (
    <Layout>
      <h1>
        <a href="/slackslashcommands">slackslashcommands</a> : <a href={`/slackslashcommands/${id}`}>{id}</a>
      </h1>
      <Callout secondary><pre>{JSON.stringify(slackslashcommand, null, '  ')}</pre></Callout>
      <Button href={`/slackslashcommands/${id}/edit`}>Edit</Button>
    </Layout>
  )
}

Show.propTypes = {
  slackslashcommand: PropTypes.shape(shape).isRequired,
}
