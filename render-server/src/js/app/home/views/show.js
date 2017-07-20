import React, {PropTypes} from 'react'
import Button from 'revelry-components/lib/Button'
import Layout from 'app/shared/components/Layout'
import Callout from 'revelry-components/lib/Callout'
import shape from '../shape'

export default function Show() {
  return (
    <Layout>
      <h1 className="text-center">
        Welcome to timekeeper.
      </h1>
      <p className="text-center">
        This thing is a slack bot, so there's really no web UI yet.
      </p>
    </Layout>
  )
}

Show.propTypes = {
}
