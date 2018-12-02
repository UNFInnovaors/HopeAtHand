import React, { Component } from 'react';
import CreateSmartComponent from './Containers/CreateLessonPlan/CreateSmart';
import LessonPlanSearch from './Containers/LessonPlanSearch/LessonPLanSmartContainer'
import Filler from './components/HOC/Filler';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/purple'
import AppBar from './components/AppBar/AppBar'

let theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
});


export default class App extends Component {
  displayName = App.name;
  
  state = {
    Theme:null
  }
  
  componentDidMount(){
    let themez = createMuiTheme({
      palette: {
        primary: blue,
        secondary: pink
      },
    });
    this.setState({Theme:themez})
  }

  ChangeSecondary = (event) => {
    let themez = JSON.parse(JSON.stringify(this.state.Theme))
    console.log('this is themez', themez, event.target.value, themez.palette.primary)
    let newTheme = createMuiTheme({
      palette:{
        primary: 
          themez.palette.primary,
        
        secondary:{ 
          main: event.target.value
          }
      }
    })
    this.setState({Theme:newTheme})
  }
  
  ChangePrimary =(event) => {
    let themez = JSON.parse(JSON.stringify(this.state.Theme))
    console.log('this is themez', themez, event.target.value, themez.palette.primary)
    let newTheme = createMuiTheme({
      palette:{
        primary: { 
          main: event.target.value
          },
          secondary:themez.palette.primary
      }
    })
    this.setState({Theme:newTheme})
  }

  render() {
    return (
      <Filler>
        <MuiThemeProvider theme={this.state.Theme}>
          <AppBar/>
          <CreateSmartComponent changeSecondary={this.ChangeSecondary} changePrimary={this.ChangePrimary} />

        </MuiThemeProvider>
      </Filler>
    );
  }
}
/*</Filler>
state = {
  SelectArrayProps: [
    'Select a Theme',
    'Female Empowerment',
    'Male Empowerment'
  ],
  Theme:null,
  QuestionProps: [
    { QAsked: 'Should Not Be Empty', validation: '', type: '' }
  ],

  BaseQuestion: { QAsked: '', validation: '', type: '' }
};

GetTheOptionHandler = event => {
  console.log('this is the event of the handler you just set up', event);
  this.setState({ [event.target.name]: event.target.value });
};
ChangePrimary = (event) => {

}



GetQuestionValueHandler = event => {
  let newQuestion = JSON.parse(JSON.stringify(this.state.BaseQuestion));
  newQuestion.QAsked = event.target.value;
  newQuestion.validation = 'Num';
  newQuestion.type = 'number';
  let collectionOfQuestions = JSON.parse(
    JSON.stringify(this.state.QuestionProps)
  );
  collectionOfQuestions.push(newQuestion);
  this.setState({ QuestionProps: collectionOfQuestions });
  console.log('this is the question you just typed in', newQuestion);
};

render() {
  let something = <div />;
  if (this.state.QuestionProps.length > 0) {
    something = this.state.QuestionProps.map((localName, index) => {
      return <ReuseableQuestion key={index} questionMetaData={localName} />;
    });
  }
}
}
//onClick={this.GetQuestionValueHandler}
*/


