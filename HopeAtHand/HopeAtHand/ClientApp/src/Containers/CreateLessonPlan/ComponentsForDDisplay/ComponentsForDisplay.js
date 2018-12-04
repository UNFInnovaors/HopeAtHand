import React from 'react'
import { Paper, Typography, Button, Grid } from '@material-ui/core';

const ComponentsForDisplay = (props) => {

    console.log(props)

    let toDisplay = props.components.map((item, index) => {
        console.log(item)
        return(
            <Grid container xs={4}>
            <Paper style={{padding:'28px', minWidth:'95%', minHeight:'95%'}}> 
            <Typography variant="h4" align="center">{item.title}</Typography>
                <Grid item xs={12}><Button fullWidth color="primary">Action</Button></Grid>
                <Grid item xs={12}><Button fullWidth color="primary">Action 2</Button></Grid>
            </Paper>
            </Grid>
        )
    })
    
    return(
        <Paper style={{padding:'28px', marginRight:'4%', marginLeft:'4%'}}>
        <Grid container> 
            
                {toDisplay}
           
        </Grid>
        <Grid container style={{marginTop:'2.5%'}}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} ><Button fullWidth color="primary" variant="contained">Upload Lesson</Button></Grid>
            <Grid item xs={3}></Grid>
        </Grid>
        </Paper>
    );
}

export default ComponentsForDisplay