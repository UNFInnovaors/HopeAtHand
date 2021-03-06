import React, {Component} from 'react';
import PoemSearch from '../../../PoemSearch/PoemSearch';

import { Typography, Grid, Paper, Divider, Button } from '@material-ui/core';

import Filler from '../../../../components/HOC/Filler';

/** Takes in the current sate of LessonPlan and returns the formatted HTML to display the Lesson Plan */
class  displayLessonPlan extends Component {

  render(){
  //console.log('This is props ', this.props.LessonPlan);
  if (this.props.LessonPlan === '') {
    return <div></div>;
  } else {
    return (
      <Grid container item>
        <Grid item xs={12} style={{margin:'2.5%'}}>
          <Typography variant="h3" align="center"> Lesson Plan Viewer : {this.props.LessonPlan.name}</Typography>
        </Grid>
        <hr/>
        
        <Grid item container xs={4}>
          <Paper style={{padding:'24px', minWidth:'90%'}}>
            <Grid item xs={12} style={{margin:'auto'}}>
              <Typography variant="h5" align="center">Poem : {this.props.LessonPlan.poem.title}</Typography>
              <Divider/>
              <PoemSearch FindThePoem= {this.props.FindThePoem}/>
              {(this.props.isUpload === true ? 
              <Grid container>
                <Grid xs={3}> </Grid>
                <Grid xs={6}>
                  <Button fullWidth onClick={() => this.props.addComponent(this.props.LessonPlan.artPiece)} variant="contained" color="primary">Save To New Lesson Plan</Button> 
                </Grid>
                <Grid xs={3}></Grid>
              </Grid>
               : "")}
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={4}>
         <Paper style={{padding:'24px', minWidth:'90%'}}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Writing Assignment : {this.props.LessonPlan.writing.title}</Typography>
              <Divider/>
              {(this.props.isUpload === true ? 
              <Grid container>
                <Grid xs={3}> </Grid>
                <Grid xs={6}>
                  <Button fullWidth onClick={() => this.props.addComponent(this.props.LessonPlan.artPiece)} variant="contained" color="primary">Save To New Lesson Plan</Button> 
                </Grid>
                <Grid xs={3}></Grid>
              </Grid> 
              : "")}
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={4}>
          <Paper style={{padding:'24px', minWidth:'90%'}}>  
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Art Piece : {this.props.LessonPlan.artPiece.title}</Typography>
              <Divider/>
              {(this.props.isUpload === true ? 
                <Grid container>
                  <Grid xs={3}> </Grid>
                  <Grid xs={6}>
                    <Button fullWidth onClick={() => this.props.addComponent(this.props.LessonPlan.artPiece)} variant="contained" color="primary">Save To New Lesson Plan</Button> 
                  </Grid>
                  <Grid xs={3}></Grid>
                </Grid>: "")}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    
    );
  }}
}
/** This method takes in an array of lesson plans and returns them mapped into JSX for the LessonPlanRenderMethod */
export default displayLessonPlan;