import React, { useState } from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const ConfigFieldInput = ({ type: initialType, ...props }) => {
  const [field, meta] = useField(props)
  const [type, setType] = useState(initialType)
  const [showPassword, setShowPassword] = useState(false)
  const toggleType = () => {
    if (type === 'password') {
      setShowPassword(true)
      setType('text')
    } else {
      setShowPassword(false)
      setType('password')
    }
  }
  let passwordIcon = null
  if (initialType === 'password') {
    passwordIcon = (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={toggleType}
          onMouseDown={toggleType}
          edge="end">
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }
  return (
    <TextField
      type={type}
      error={meta.touched && meta.error}
      helperText={meta.error}
      InputProps={{
        endAdornment: passwordIcon,
      }}
      {...field}
      {...props}
    />
  )
}

export default ConfigFieldInput
