import React, {PropTypes} from 'react'
import {Input} from 'revelry-components/lib/forms'
import Button from 'revelry-components/lib/Button'
import shape from '../shape'

export default function Form({slackslashcommand, ...props}) {
  return (
    <form {...props}>
      <Input.Stack
        label="name"
        name="slackslashcommands[name]"
        defaultValue={slackslashcommand.name}
      />
      <Button>Save</Button>
    </form>
  )
}

Form.propTypes = {
  slackslashcommand: PropTypes.shape(shape).isRequired,
}
