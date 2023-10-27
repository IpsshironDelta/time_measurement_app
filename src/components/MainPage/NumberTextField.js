import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

function NumberInputField(props) {

  return (
    <TextField
      fullWidth  = {props.fullWidth}
      id         = {props.id}
      label      = {props.label}
      type       = {props.type}
      value      = {props.value}
      helperText = {props.helperText}
      height     = {props.height}
      sx         = {props.sx}
      onChange   = {props.onChange}/>
  )
}
export default NumberInputField