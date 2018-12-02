import React from 'react'
import DisplayLessonPlan from './LessonPlanMethods';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import ReuseableSelect from '../../components/UI Components/ReuseableSelect';
import ColorPicker from '../../components/UI Components/ColorPicker';


const lessonPlanSearchDumbComponent = (props) => {

        let showLesson = <div />;
        if (props.chosenLesson !== '') {
          showLesson = (
            <DisplayLessonPlan
              FindThePoem={props.changePoemHandler}
              LessonPlan={props.chosenLesson}
            />
          );
        }
        let displayLessonPlans = props.lessons.map((lesson, index) => {
          console.log(lesson);
          let size = 4
          if(props.lessons.length > 4)
          {
            size = 4
          }
          return (
            <Grid container xs={size}>
              <Grid item xs={12}><Typography variant='h2' align='center'>{lesson.name}</Typography></Grid>
              <Grid container item xs={12}>
                <Grid item xs={1}></Grid>
                  <Grid item xs={12}> <img src='https://htmljs.blob.core.windows.net/images/BojackGirlfriend.jpg' width='100%' height='100%'></img></Grid>
                <Grid item xs={1}></Grid>
              </Grid>              
              <Grid item container xs={6}>
                <Grid item xs={12}><Button variant='contained' fullWidth>Test</Button></Grid>
                <Grid item xs={12}><Button fullWidth variant='contained' color='secondary' onClick={(event) => props.selectLesson(event, index)}> View Lesson </Button></Grid>
                <Grid item xs={12}><Button variant='contained' fullWidth>Cancel Lesson</Button></Grid>
              </Grid>
              <Grid item container xs={6}>
              <Grid xs={1}></Grid>
                <Grid item xs={11}>
                  <Typography variant='h5'>Poem : </Typography>
                  <Typography variant='h5'>{lesson.poem.title}</Typography>
                  <Typography variant='h5'></Typography>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid item xs={11}>
                  <Typography variant='h5'>Writing Assignment :</Typography>
                  <Typography variant='h5'>{lesson.writing.title}</Typography>
                  <Typography variant='h5'></Typography>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid item xs={11}>
                  <Typography variant='h5'>Art Piece :</Typography>
                  <Typography variant='h5'>{lesson.artPiece.title}</Typography>
                  <Typography variant='h5'></Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        });
    
        return (
          <Grid container spacing={12}> 
            <Grid container item spacing={32}>
              <Grid item xs={12}><Typography variant="h4" align='center'>Search To Upload  {(props.selectedOption != null ? props.selectedOption : "" )}</Typography></Grid>
              
            </Grid>
            <hr/>
            <Grid container item spacing={16}>
              <Grid item container xs={4} alignItems ='center'>
                <Grid item xs={4}><Typography variant="h4" align='center'>Search For : </Typography></Grid>
                <Grid item xs={4}> <ReuseableSelect changeStateOfOptions={props.changeOption} valuesForOptions={['Choose What To Search For','Lesson Plans', 'Poems', 'Writing Assignments', 'Art Pieces', 'All']}/> </Grid>
                <Grid item xs={4}>
                </Grid>
              </Grid>
              <Grid container item xs={4} alignItems='center'>
                <Grid item xs={5}><Typography variant="h4">Choose a Theme : </Typography>  </Grid>
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
            
            <div>{displayLessonPlans}</div>
            <div>{showLesson}</div>
            <Grid container item xs={12} spacing={24} style={{marginTop:'5%'}}>
              <ColorPicker changeSecondary={props.changeSecondary} changePrimary={props.changePrimary}/>
            </Grid>
          </Grid>
          
        );
      }

export default lessonPlanSearchDumbComponent