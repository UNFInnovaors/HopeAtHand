import React, { Component } from 'react';
import {get } from '../../Axios/Instances'
import Select from 'react-select';


/* In order to use this copmponent this.props.updateThemes must be provied, typically is used to update the a state vaiable called themes"*/

class ThemeSelect extends Component {
  state = {
    Themes: [''],
    selectedOption: ['']
  };

  /* This component requires that all options be configured using the following object [{ value : 'the value', label: 'What is seen'}] 
    This could be done on the server, or even the db could be configured or mapped for right now it is done on the client*/
  componentDidMount() {
      get('/theme/getthemes').then(response => {
      console.log(response, 'These are the themes');
      let themesForDisplay = [];
      for(let x = 0 ; x < response.data.length; x++){
        themesForDisplay[x] = {value: response.data[x], label: response.data[x]}
      }
      this.setState({ Themes: themesForDisplay });
      
    });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.updateThemes(selectedOption);
    let newThemes = []
    for(let x = 0 ; x < selectedOption.length; x++){
      newThemes[x] = selectedOption[x].label
    }
    sessionStorage.setItem('LessonThemes', newThemes)
  };

  render() {
    console.log('This is props', this.props);
    return (
      <Select
        onChange={this.handleChange}
        options={this.state.Themes}
        isMulti={true}
        placeholder={'Select A Theme'}
        hideSelectedOptions={true}
      />
    );
  }
}
export default ThemeSelect;