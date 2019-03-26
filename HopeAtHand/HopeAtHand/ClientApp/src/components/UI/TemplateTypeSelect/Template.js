import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
/*To Use this component you must include a prop for :
  valuesForOptions and changeStateOfOptions
*/
class ReuseableSelect extends Component {
  state = {
    themes: [
      {content : 'Select A Theme', active: false},
      {content : 'Female Empowerment', active: false},
      {content : 'Male Empowerment', active: false},
      {content : 'Conscientiousness', active: false},
      {content : 'Confidence', active: false},
      {content : 'Strength', active: false},
      {content : 'Nature', active: false}
    ],
    selectedValues: []
  };
  componentDidMount() {

  }

  
  handleChange = event => {
    let themeList = {...this.state.themes}
    let index = -1
    for(let x = 0 ;x < themeList.length; x++){
        if(themeList[x].content === event.target.value){
            index = x
        }
    }
    if(index =-1){
        return
    }
    themeList[index].active = !themeList[index].active
    let newValues = [...this.state.selectedValues]
    if(themeList[index].active === true){
        newValues.push(event.target.value)
    } else{
        newValues.splice(index, 1)
    }
    console.log(newValues)
    
    this.setState({ themes: themeList, selectedValues: newValues})

  };
  render() {
    return (
        <FormControl
          variant="standard"
          error={this.state.selectedValue === this.state.themes[0]}
          fullWidth
          value=""
          style={{fontSize:18}}
        >
          <Select style={{fontSize:18}}
            //native //props.native//props. defaults
            onChange={this.handleChange} //props. handler
            fullWidth
            
            label={(this.props.label !== null ? this.props.label : "")}
          >
            {this.state.themes.map(
              (aTheme, index) => (
                <option
                  key={index+'b'}
                  style={{fontSize:18}}
                  disabled={aTheme.content === this.state.selectedValues[0]}
                  key={index}
                  value={aTheme.content}
                  selected={aTheme.active}
                >
                  {aTheme.content}
                </option>
              )
            )}
          </Select>
        </FormControl>
    );
  }
}

export default ReuseableSelect;
