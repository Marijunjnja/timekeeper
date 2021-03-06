import React, {PropTypes} from 'react'
import Button from 'revelry-components/lib/Button'
import Layout from 'app/shared/components/Layout'
import ListItem from '../components/ListItem'
import shape from '../shape'

function renderListItem(home) {
  const {id} = home

  return (
    <ListItem
      key={id}
      home={home}
    />
  )
}

export default function Index({homes}) {
  return (
    <Layout>
      <h1>homes</h1>
      <Button href="/homes/new">Create a new home</Button>
      {homes.map(renderListItem)}
    </Layout>
  )
}

Index.propTypes = {
  homes: PropTypes.arrayOf(PropTypes.shape(shape)).isRequired,
}
