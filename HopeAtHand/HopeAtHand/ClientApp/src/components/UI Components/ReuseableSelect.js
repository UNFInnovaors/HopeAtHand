import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
/*To Use this component you must include a prop for :
  valuesForOptions and changeStateOfOptions
*/
class ReuseableSelect extends Component {
  state = {
    themes: [
      'Select A Theme',
      'Female Empowerment',
      'Male Empowerment',
      'Conscientiousness',
      'Confidence',
      'Strength',
      'Nature'
    ],
    selectedValue: ''
  };
  componentDidMount() {
    this.setState({ selectedValue: this.props.valuesForOptions[0] });
  }

  
  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.changeStateOfOptions(event.target.value);
  };
  render() {
    return (
        <FormControl
          variant="standard"
          error={this.state.selectedValue === this.state.themes[0]}
          fullWidth
          style={{fontSize:18}}
          
        >
          <Select style={{fontSize:18}}
            //native //props.native
            value={this.state.selectedValue} //props. defaults
            onChange={this.handleChange} //props. handler
            fullWidth
            
            label={(this.props.label !== null ? this.props.label : "")}
          >
            {this.props.valuesForOptions.map(
              (aTheme, index) => (
                <option
                  style={{fontSize:18}}
                  disabled={aTheme === this.props.valuesForOptions[0]}
                  key={index}
                  value={aTheme}
                >
                  {aTheme}
                </option>
              ) //props for more things...
            )}
          </Select>
        </FormControl>
    );
  }
}

export default ReuseableSelect;
