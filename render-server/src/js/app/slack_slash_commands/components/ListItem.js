import React, {PropTypes} from 'react'
import shape from '../shape'

export default function ListItem({slackslashcommand}) {
  const {id, name} = slackslashcommand

  return (
    <li><a href={`/slackslashcommands/${id}`}>{name}</a></li>
  )
}

ListItem.propTypes = {
  slackslashcommand: PropTypes.shape(shape).isRequired,
}
