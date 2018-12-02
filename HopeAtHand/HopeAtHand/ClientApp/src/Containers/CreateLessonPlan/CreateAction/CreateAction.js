import React, { Component } from 'react'
import LessonPlanSearch from '../../LessonPlanSearch/LessonPLanSmartContainer';
import Upload from '../../UploadFileSmartContainer/UploadFileSmartContainer'
import { Grid } from '@material-ui/core';

const createAction = (props) => {
    let action = <div></div>
    console.log(props.action)
    switch(props.action)
    {
        case('search') :
            action = <LessonPlanSearch/>
        break;
        case('create') :
            action = <Upload/>
        break;
        default :
            action=<div></div>
        break;   
    }
    return <Grid container item xs={12}>
                <Grid item xs={12}>{action}</Grid>
            </Grid>
}

export default createAction