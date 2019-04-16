import React from 'react'
import ViewModal from '../../../components/UI Components/Modals/ViewDocument'
import { Paper, Typography, Button, Grid } from '@material-ui/core';

const ComponentsForDisplay = (props) => {

    let toDisplay = props.components.map((item, index) => {
        //console.log('this is the item in component', item)
        return(
            <Grid container xs={4}>
            <Paper style={{padding:'28px', minWidth:'95%', minHeight:'95%'}}> 
            <Typography variant="h5" align="center">Title : {item.name}</Typography>
            <Typography variant="h6" align="center">Document Type : {item.type}</Typography>
                <Grid item xs={12}><ViewModal 
                                        id={item.id}
                                        addFavorites={props.AddFavorites}
                                        viewDocument={item}/></Grid>
                <Grid item xs={12} style={{marginTop:24}}><Button fullWidth color="primary" variant='contained' onClick={() => props.removeFromLesson(index)}>Remove from Lesson Plan</Button></Grid>
            </Paper>
            </Grid>
        )
    })
    
    return(
            <Grid container> 
                {toDisplay}
            </Grid>
    );
}

export default ComponentsForDisplay