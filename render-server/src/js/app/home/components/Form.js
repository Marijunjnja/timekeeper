import React, {PropTypes} from 'react'
import {Input} from 'revelry-components/lib/forms'
import Button from 'revelry-components/lib/Button'
import shape from '../shape'

export default function Form({home, ...props}) {
  return (
    <form {...props}>
      <Input.Stack
        label="name"
        name="homes[name]"
        defaultValue={home.name}
      />
      <Button>Save</Button>
    </form>
  )
}

Form.propTypes = {
  home: PropTypes.shape(shape).isRequired,
}
