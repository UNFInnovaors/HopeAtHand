import React, { Component } from 'react';
import CreateSmartComponent from './Containers/CreateLessonPlan/CreateSmart';
import LessonPLanSmartContainer from './Containers/LessonPlanSearch/LessonPLanSmartContainer'
import UploadFileSmartContainer from './Containers/UploadFileSmartContainer/UploadFileSmartContainer'
import Admin from './Containers/Admin/AdminSmart'
import LogIn from './Containers/LogInForm/LoginSmartContainer'
import CreateTheme from './Containers/CreateTheme/CreateTheme'
import Search from './Containers/PrimarySearchComponent/SearchSmartContainer'
import { Route, Redirect } from 'react-router-dom'
import Filler from './components/HOC/Filler';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core'
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
    Theme: theme,
    UserName : null
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

  Login = () => {
    console.log("Login was called")
    this.setState({UserName : "Hello"})
  }
  LogOut = () => {
    this.setState({UserName : null})
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
    if(false) //this.state.UserName === null
    {
      return (
        <Filler>
          <MuiThemeProvider theme={this.state.Theme}>
          <Paper  style={{height : '100%', paddingBottom:'5%'}}>
            <AppBar  LoggedIn ={this.state.UserName}/>
            <LogIn login={this.Login}/>
          </Paper>
          </MuiThemeProvider>
        </Filler>
      )
    } else {
    return (
      <Filler>
        <MuiThemeProvider theme={this.state.Theme}>
          <Paper  style={{height : '100%', paddingBottom:'5%'}}>
            <AppBar logOut={this.LogOut} LoggedIn ={this.state.UserName}/>
            
            <Route path="/" exact render={(props) => 
                <CreateSmartComponent/>
            }/>
            <Route path="/Create" exact render={(props) => 
                <CreateSmartComponent/>
            }/>
            <Route path="/Search" exact render={(props) => 
              <LessonPLanSmartContainer/>}>
            </Route>
            <Route path="/Search2" exact render={(props) => 
             <Search/>}/>
            <Route path="/Upload" exact render={(props) => 
              <UploadFileSmartContainer/>}>
            </Route>
            <Route path="/Admin" exact render={(props) => 
              <Admin/>}>
            </Route>
            <Route path="/Theme" exact render={(props) => 
              <CreateTheme/>}/>
          </Paper>
        </MuiThemeProvider>
      </Filler>
    );
  }
}
/*</Filler>
<Route path="" render={(props) => <Redirect to="/"/>}> </Route>
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
}