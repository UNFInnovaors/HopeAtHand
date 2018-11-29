import React, { Component } from 'react';
<<<<<<< HEAD
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
=======
import LessonPlanSearch from './Containers/LessonPlanSearch/LessonPLanSmartContainer';
>>>>>>> 0a8009385bd17b94ed3b7328fd4bffb6814eb0ac
import Button from '@material-ui/core/Button';
import ReuseableSelect from './components/UI Components/ReuseableSelect';
import ReuseableQuestion from './components/UI Components/ReuseableQuestion';
<<<<<<< HEAD
import CreateSmartComponent from './Containers/CreateLessonPlan/CreateSmart';
import Filler from './components/HOC/Filler';
import ThemeBox from './components/UI/ThemeBox/ThemeBox';
=======
import AppBar from './components/AppBar/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/purple'

let theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
});

>>>>>>> 0a8009385bd17b94ed3b7328fd4bffb6814eb0ac

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Filler>
        <CreateSmartComponent />
      </Filler>
    );
  }
}

/*state = {
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
  componentDidMount(){
    let themez = createMuiTheme({
      palette: {
        primary: blue,
        secondary: pink
      },
    });
    this.setState({Theme:themez})
  }
  GetTheOptionHandler = event => {
    console.log('this is the event of the handler you just set up', event);
    this.setState({ [event.target.name]: event.target.value });
  };
  ChangePrimary = (event) => {

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
    return (
      <div>
<<<<<<< HEAD
        <div>
          <AppBar position="static">
            <Grid container xs={12} spacing={12}>
              <Grid item xs={2} style={{ marginTop: '8px' }}>
                <Button variant="contained" fullWidth color="secondary">
                  <Typography>LOGO</Typography>
                </Button>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <InputBase
                  style={{ margin: '8px' }}
                  placeholder="Search..."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2} style={{ marginTop: '8px' }}>
                <Button variant="contained" fullWidth color="secondary">
                  <Typography>LOGOUT</Typography>
                </Button>
              </Grid>

              <Grid item xs={1}>
                <IconButton style={{ margin: '3px' }}>
                  <AccountCircle style={{}} />
                </IconButton>
              </Grid>
            </Grid>
          </AppBar>
        </div>
        <ReuseableSelect
          defaults={this.state.SelectArrayProps[0]}
          valuesForOptions={this.state.SelectArrayProps}
          changeStateOfOptions={this.GetTheOptionHandler}
        />
        {something}
        <Button factorize={this.GetQuestionValueHandler}>Add a Question</Button>
=======
        <MuiThemeProvider theme={(this.state.Theme === null ? theme : this.state.Theme)}>
          <AppBar/>
          <LessonPlanSearch changeSecondary={this.ChangeSecondary} changePrimary={this.ChangePrimary} />
        </MuiThemeProvider>
>>>>>>> 0a8009385bd17b94ed3b7328fd4bffb6814eb0ac
      </div>
    );
  }
}
//onClick={this.GetQuestionValueHandler}
*/
