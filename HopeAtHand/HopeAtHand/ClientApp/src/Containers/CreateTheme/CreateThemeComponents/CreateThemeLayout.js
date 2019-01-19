import React from 'react'

import { Grid, Typography, TextField, Button } from '@material-ui/core'

import './CreateThemeInterface.css'
//<Typography variant='headline' style={{margin: 'auto'}} align='center' gutterBottom >Create Theme</Typography>
const Layout = ( props ) => {
    return(
        <Grid container spacing={24}>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={4}><TextField fullWidth label='Please enter the name of the new Theme' value={props.ThemeName} onChange={props.ChangeThemeName} /></Grid>
            <Grid item xs={3}><Button onClick={props.CreateTheme} variant='contained' fullWidth>Create Theme</Button></Grid>
            <Grid item xs={1}></Grid>
        </Grid>);
}

export default Layout
