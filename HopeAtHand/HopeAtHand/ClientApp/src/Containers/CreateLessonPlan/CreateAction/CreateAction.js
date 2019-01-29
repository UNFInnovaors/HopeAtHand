import React, { Component } from 'react'
import LessonPlanSearch from '../../PrimarySearchComponent/SearchSmartContainer';
import Upload from '../../UploadFileSmartContainer/UploadFileSmartContainer'
import { Grid } from '@material-ui/core';

const createAction = (props) => {
    let action = <div></div>
    switch(props.action)
    {
        case('search') :
            action = <LessonPlanSearch isUpload={props.isUpload} 
                                        addComponent={props.addComponent} 
                                        addToLesson={props.addToLesson}
                                        removeFromLesson={props.removeFromLesson}/>
        break;
        case('create') :
            action = <Upload isUpload={props.isUpload} addComponent={props.addComponent}/>
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