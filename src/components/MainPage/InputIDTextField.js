import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

function InputIDTextField(props) {

  return (
    <TextField
      fullWidth  = {props.fullWidth}
      id         = {props.id}
      label      = {props.label}
      type       = {props.type}
      value      = {props.value}
      sx         = {props.sx}
      helperText = {props.helperText}
      onChange   = {props.onChange}/>
  )
}
export default InputIDTextField