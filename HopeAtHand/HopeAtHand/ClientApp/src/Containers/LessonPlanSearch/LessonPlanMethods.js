import React from 'react';
import PoemSearch from '../PoemSearch/PoemSearch';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Actions from './Actions/Actions'
import Classes from './LessonPlan.css';

/** Takes in the current sate of LessonPlan and returns the formatted HTML to display the Lesson Plan */
const displayLessonPlan = (props) => {

  console.log('This is props !! ', props.LessonPlan);
  if (props.LessonPlan === '') {
    return <div>Nothing is displayed</div>;
  } else {
    return (
      <Grid container spacing={16}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Typography align='center' variant="h2">{props.LessonPlan.name}</Typography>
          </Grid>
        </Grid>
        <Grid container item spacing={12}>
          <Grid item xs={4}>
            <Typography align='center' variant="h5">Poem : {props.LessonPlan.poem.title}</Typography>
            <Actions/>
          </Grid>
          <Grid item xs={4}>
            <Typography align='center' variant="h5">Writing Assignment : {props.LessonPlan.writing.title}</Typography>
            <Actions/>
          </Grid>
          <Grid item xs={4}>
            <Typography align='center' variant="h5">Art Piece : {props.LessonPlan.artPiece.title}</Typography>
            <Actions/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
/** This method takes in an array of lesson plans and returns them mapped into JSX for the LessonPlanRenderMethod */
export default displayLessonPlan;
