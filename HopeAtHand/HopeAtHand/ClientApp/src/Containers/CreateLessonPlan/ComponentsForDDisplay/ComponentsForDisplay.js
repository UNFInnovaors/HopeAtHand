import React from 'react'
import { Paper, Typography, Button, Grid } from '@material-ui/core';

const ComponentsForDisplay = (props) => {

    let toDisplay = props.components.map((item, index) => {
        return(
            <Grid container xs={4}>
            <Paper style={{padding:'28px', minWidth:'95%', minHeight:'95%'}}> 
            <Typography variant="h5" align="center">Title : {item.name}</Typography>
            <Typography variant="h6" align="center">Document Type : {item.type}</Typography>
                <Grid item xs={12}><Button fullWidth color="primary">View/Edit</Button></Grid>
                <Grid item xs={12}><Button fullWidth color="primary" variant='contained' onClick={() => props.removeFromLesson(index)}>Remove from Lesson Plan</Button></Grid>
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
            <Grid item xs={6} ><Button fullWidth color="primary" onClick={props.uploadLessonPLan} variant="contained">Upload Lesson</Button></Grid>
            <Grid item xs={3}></Grid>
        </Grid>
        </Paper>
    );
}

export default ComponentsForDisplay