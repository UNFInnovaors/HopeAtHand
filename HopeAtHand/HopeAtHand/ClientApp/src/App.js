import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ReuseableSelect from './components/UI Components/ReuseableSelect';
import ReuseableQuestion from './components/UI Components/ReuseableQuestion';
import CreateSmartComponent from './Containers/CreateLessonPlan/CreateSmart';
import Filler from './components/HOC/Filler';
import ThemeBox from './components/UI/ThemeBox/ThemeBox';

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

    QuestionProps: [
      { QAsked: 'hEY MAKE THIS NOT EMPTY', validation: '', type: '' }
    ],

    BaseQuestion: { QAsked: '', validation: '', type: '' }
  };

  GetTheOptionHandler = event => {
    console.log('this is the event of the handler you just set up', event);
    this.setState({ [event.target.name]: event.target.value });
  };

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
      </div>
    );
  }
}
//onClick={this.GetQuestionValueHandler}
*/
