import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField'

const dumbTest = (props) =>{
    return(
    <TextField label={props.initial}/>
    );
}

export default dumbTest