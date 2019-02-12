import React, {Component } from 'react'
import { Grid, Button, Typography} from '@material-ui/core'
import LessonPlanViewer from './Layout/LessonPlanViewer'
import Heading from '../../components/UI Components/Heading/Heading'

class LessonPlanViewSmartComponent extends Component{

    state = {

    }

    componentDidMount(){

    }

    render(){
        return (
            <Grid container>
                <Grid xs={12}><Heading>Lesson Plans</Heading></Grid>
                <LessonPlanViewer/>
                <Grid item xs={4}>
                    <Button variant='contained' fullWidth>This is a button</Button>
                </Grid>
            </Grid>
        )
    }
}

export default LessonPlanViewSmartComponent