import React, {PropTypes} from 'react'
import Layout from 'app/shared/components/Layout'
import Form from '../components/Form'
import shape from '../shape'

export default function Edit({home}) {
  const {id} = home

  return (
    <Layout>
      <h1>
        <a href="/homes">homes</a> : <a href={`/homes/${id}`}>{id}</a> : edit
      </h1>
      <Form
        home={home}
        method="post"
        action={`/homes/${id}`}
      />
    </Layout>
  )
}

Edit.propTypes = {
  home: PropTypes.shape(shape).isRequired,
}
