import React, {PropTypes} from 'react'
import Layout from 'app/shared/components/Layout'
import Form from '../components/Form'
import shape from '../shape'

export default function New({slackslashcommand}) {
  return (
    <Layout>
      <h1>
        <a href="/slackslashcommands">slackslashcommands</a> : new
      </h1>
      <Form
        slackslashcommand={slackslashcommand}
        method="post"
        action="/slackslashcommands"
      />
    </Layout>
  )
}

New.propTypes = {
  slackslashcommand: PropTypes.shape(shape).isRequired,
}
