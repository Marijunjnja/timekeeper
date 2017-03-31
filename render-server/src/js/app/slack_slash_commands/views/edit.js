import React, {PropTypes} from 'react'
import Layout from 'app/shared/components/Layout'
import Form from '../components/Form'
import shape from '../shape'

export default function Edit({slackslashcommand}) {
  const {id} = slackslashcommand

  return (
    <Layout>
      <h1>
        <a href="/slackslashcommands">slackslashcommands</a> : <a href={`/slackslashcommands/${id}`}>{id}</a> : edit
      </h1>
      <Form
        slackslashcommand={slackslashcommand}
        method="post"
        action={`/slackslashcommands/${id}`}
      />
    </Layout>
  )
}

Edit.propTypes = {
  slackslashcommand: PropTypes.shape(shape).isRequired,
}
