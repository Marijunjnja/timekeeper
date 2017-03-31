import React, {PropTypes} from 'react'
import shape from '../shape'

export default function ListItem({home}) {
  const {id, name} = home

  return (
    <li><a href={`/homes/${id}`}>{name}</a></li>
  )
}

ListItem.propTypes = {
  home: PropTypes.shape(shape).isRequired,
}
