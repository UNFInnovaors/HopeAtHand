import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import axios from 'axios';

class ThemeSelect extends Component {
  state = {
    Themes: [''],
    selectedOption: ['']
  };

  componentDidMount() {
    axios.get('https://localhost:44365/api/theme/getthemes').then(response => {
      console.log(response);
      this.setState({ Themes: response.data.themes });
    });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.props.updateThemes(selectedOption);
  };

  render() {
    console.log('This is props', this.props);
    return (
      <Select
        onChange={this.handleChange}
        options={this.state.Themes}
        isMulti={true}
        placeholder={'Select A Theme'}
      />
    );
  }
}
export default ThemeSelect;
