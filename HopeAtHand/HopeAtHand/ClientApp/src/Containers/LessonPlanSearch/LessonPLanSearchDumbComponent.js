import React from 'react'
import DisplayLessonPlan from './LessonPlanMethods';

import { Grid, Button, Typography, Divider, Select } from '@material-ui/core';
import ReuseableSelect from '../../components/UI Components/ReuseableSelect';
import ColorPicker from '../../components/UI Components/ColorPicker';


const lessonPlanSearchDumbComponent = (props) => {

        let showLesson = <div />;
        if (props.chosenLesson !== '') {
          showLesson = (
            <DisplayLessonPlan
              FindThePoem={props.changePoemHandler}
              LessonPlan={props.chosenLesson}
              isUpload ={props.isUpload}
              addComponent={props.addComponent}
            />
          );
        }
        let displayLessonPlans = <div></div>
        if(props.lessons !== null && props.lessons.length > 0)
          {displayLessonPlans = 
          <Grid container spacing={8}>
          
              <Grid item xs={2}><Button variant="contained" fullWidth color="secondary">Previous Page</Button></Grid>
              <Grid item xs={8}></Grid>
              <Grid xs={2}><Button variant="contained" fullWidth color="secondary">Next Page</Button></Grid>

            {(props.lessons.map((lesson, index) => {
            console.log(lesson);
            let size = 4
            if(props.lessons.length > 4){
              size = 4
            }
            return (
              <Grid container xs={12/size} style={{marginLeft:'5%', marginTop:'2.5%'}}>
                <Grid item xs={12}><Typography variant='h2' align='center'>{lesson.name}</Typography> <Divider/></Grid>
               
                <Grid container item xs={12}>
                  <Grid item xs={1}></Grid>
                    <Grid item xs={12}> <img src='https://htmljs.blob.core.windows.net/images/BojackGirlfriend.jpg' width='100%' height='100%'></img></Grid>
                  <Grid item xs={1}></Grid>
                </Grid>              
                <Grid item container xs={6}>
                  <Grid item xs={12}><Button variant='contained' fullWidth>Add To Favorites</Button></Grid>
                  <Grid item xs={12}><Button fullWidth variant='contained' color='secondary' onClick={(event) => props.selectLesson(event, index)}> View Lesson </Button></Grid>
                  <Grid item xs={12}><Button variant='contained' fullWidth>Edit</Button></Grid>
                </Grid>
                <Grid item container xs={6}>
                <Grid xs={1}></Grid>
                  <Grid item xs={11}>
                    <Typography variant='h5'>Poem : </Typography>
                    <Typography variant='body1'>{lesson.poem.title}</Typography>
                    <Typography variant='h5'></Typography>
                  </Grid>
                  <Grid xs={1}></Grid>
                  <Grid item xs={11}>
                    <Typography variant='h5'>Writing Assignment :</Typography>
                    <Typography variant='body1'>{lesson.writing.title}</Typography>
                    <Typography variant='h5'></Typography>
                  </Grid>
                  <Grid xs={1}></Grid>
                  <Grid item xs={11}>
                    <Typography variant='h5'>Art Piece :</Typography>
                    <Typography variant='body1'>{lesson.artPiece.title}</Typography>
                    <Typography variant='h5'></Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
        }))};
        
        </Grid>
          }
        return (
          <Grid container spacing={8}> 
            <Grid container item spacing={32}>
              <Grid item xs={12}><Typography variant="h4" align='center'>Search To Add  {(props.selectedOption != null ? props.selectedOption + "To A Lesson Plan" : "Documents To A Lesson Plan" )}</Typography></Grid>
              
            </Grid>
            <hr/>
            <Grid container item spacing={16}>
              <Grid item container xs={4} alignItems ='center' >
                <Grid item xs={4}><Typography variant="h4" align='center'>Search For : </Typography></Grid>
                <Grid item xs={6}> <ReuseableSelect changeStateOfOptions={props.changeOption} valuesForOptions={
                                          (props.isUpload !== true 
                                        ?['Choose What To Search For','Lesson Plans', 'Poems', 'Writing Assignments', 'Art Pieces', 'All']
                                        :['Choose What To Search For','Poems', 'Writing Assignments', 'Art Pieces', 'All'])}/> 
                </Grid>
                <Grid item xs={2}>
                </Grid>
              </Grid>
              <Grid container item xs={4} alignItems='center'>
                <Grid item xs={5}><Typography variant="h4">Choose Themes : </Typography>  </Grid>
                <Grid item xs={7}>
                 <Select
                  onChange={event => props.changeTheme(event)}
                  value={props.theme}
                  native
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple'
                  }}
                  fullWidth
                >
                  <option value={0} disabled>Select A Theme</option>
                  <option value="Female Empowerment">Female Empowerment </option>
                  <option value={'Male Empowerment'}> Male Empowerment </option>
                  <option value={'Self Acceptance'}>Self Acceptance </option>
                  <option value={'Connectivity'}> Connectivity</option>
                </Select>
                </Grid>
              </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}><Button onClick={props.search} variant='contained' color='primary' fullWidth >Submit</Button></Grid>
                <Grid item xs={1}/>
            </Grid>
            
            <div style={{marginTop:'5%'}}>{displayLessonPlans}</div>
            <Grid container spacing={8} style={{marginTop:'5%'}}>
              <Grid item xs={12}>{showLesson}</Grid>
            </Grid>
          </Grid>
          
        );
      }

export default lessonPlanSearchDumbComponent

/*<Grid container item xs={12} spacing={24} style={{marginTop:'5%'}}>
              <ColorPicker changeSecondary={props.changeSecondary} changePrimary={props.changePrimary}/>
            </Grid>*/