import React          from 'react'
import Button         from '@mui/material/Button';
import { useHistory } from "react-router-dom";

export default function PasswordResetButton(props){
    const history = useHistory();
    return(
        <Button 
            size      = {props.size}
            variant   = {props.variant} 
            startIcon = {props.startIcon}
            disabled  = {props.disabled}
            disableElevation
            fullWidth = {props.fullWidth}
            sx        = {props.sx}
            onClick={() => {
                history.push(props.link);
                }}>
            {props.text}
        </Button>
    )
}