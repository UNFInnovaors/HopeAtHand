import React, { Component } from 'react';
import DisplayLessonPlan from './LessonPlanMethods';

import { Button, Divider, Select,  Typography } from '@material-ui/core';

import axios from 'axios';


class LessonPlanSearch extends Component {
  state = {
    Theme: 0,
    Tags: '',
    Lessons: [],
    ChosenLesson: '', /** Stores Displayed Lesson */
    WhyTheFuckIsn:false
  };
  /** Changes the state of tags to */
  ChangeTags = event => {
    this.setState({ Tags: event.target.value });
  };
  /** Changes the state of theme to the selected option */
  ChangeTheme = event => {
    this.setState({ Theme: event.target.value });
  };
  Search = () => {
    //console.log(this.state.Theme);
    //console.log(this.state.Tags);
    let lessie = {
      theme: this.state.Theme,
      tags: this.state.Tags
    };
    //console.log(lessie);
    axios
      .post('/api/search/findlessonplan', lessie)
      .then(res => {
        //console.log(res);
        this.setState({ Lessons: res.data });
      });
  };
  SelectLesson = event => {
    this.setState({
      ChosenLesson: this.state.Lessons[Number(event.target.dataset.lesson)]
    });
  };

  ChangePoemHandler = selectedPoem => {
    let chosenLesson = JSON.parse(JSON.stringify(this.state.ChosenLesson));
    //console.log(chosenLesson);
    chosenLesson.poemId = selectedPoem.poemId;
    chosenLesson.poem = selectedPoem;
    this.setState({ ChosenLesson: chosenLesson });
  };

  render() {
    //console.log('this is state', this.state);
    let showLesson = <div />;
    if (this.state.ChosenLesson !== '') {
      showLesson = (
        <DisplayLessonPlan
          FindThePoem={this.ChangePoemHandler}
          LessonPlan={this.state.ChosenLesson}
          addComponent={this.props.addComponent}
        />
      );
    }
    let displayLessonPlans = this.state.Lessons.map((lesson, index) => {
      //console.log(lesson);
      return (
        <div>
          <Typography>{lesson.name}</Typography>
          <p>
            Poem : {lesson.poem.title} Writing Assignment:{' '}
            {lesson.writing.title} Art Piece : {lesson.artPiece.title}{' '}
          </p>
          <Button onClick={this.SelectLesson} data-lesson={index} color="primary">
            View Lesson
          </Button>
        </div>
      );
    });

    return (
      <div> 
        <div>
          <br/>
          <Typography variant="h2" align="center">Search For Lesson Plans</Typography>
          <br/>
          <Divider/>
          <br/>
          <Button><Typography>Choose a theme</Typography></Button>
          <Select
            onChange={event => this.ChangeTheme(event)}
            value={this.state.Theme}
            native
            inputProps={{
              name: 'age',
              id: 'age-native-simple'
            }}
          >
            <option value={0} disabled>
            <Typography> Select A Theme </Typography> 
            </option>
            <option value="Female Empowerment">Female Empowerment </option>
            <option value={'Male Empowerment'}> Male Empowerment </option>
            <option value={'Self Acceptance'}>Self Acceptance </option>
            <option value={'Connectivity'}> Connectivity</option>
          </Select>
          <br/>
          <Button margin='5px'><Typography> Search for tags : </Typography> </Button>
          <input onChange={this.ChangeTags} type="text" />
          <Button onClick={this.Search}>Submit</Button>
        </div>
        <div>{displayLessonPlans}</div>
        <div>{showLesson}</div>
      </div>
    );
  }
}
export default LessonPlanSearch;