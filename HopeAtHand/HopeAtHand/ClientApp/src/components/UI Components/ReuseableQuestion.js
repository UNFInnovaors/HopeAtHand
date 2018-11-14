import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core'

class ReuseableQ extends Component {


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
    console.log(
      this.props.questionMetaData,
      this.props.questionMetaData.QAsked

    );
    if(this.props.questionMetaData.QAsked === "")
    {
      console.log('dsafdsa')
    }
    return (
      <div>
        <FormControl>
        <TextField
          id="standard-name"
        />
        </FormControl>
      </div>
    );
  }
}

export default ReuseableQ;
