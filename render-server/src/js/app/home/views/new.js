import React, {PropTypes} from 'react'
import Layout from 'app/shared/components/Layout'
import Form from '../components/Form'
import shape from '../shape'

export default function New({home}) {
  return (
    <Layout>
      <h1>
        <a href="/homes">homes</a> : new
      </h1>
      <Form
        home={home}
        method="post"
        action="/homes"
      />
    </Layout>
  )
}

New.propTypes = {
  home: PropTypes.shape(shape).isRequired,
}
