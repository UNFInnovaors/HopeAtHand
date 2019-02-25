import React, { Component } from 'react';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import Select from 'react-select';
import ThemeBox from './ReusableThemeBox'
import axios from 'axios';
import Filler from '../../HOC/Filler';


/* In order to use this copmponent this.props.updateThemes must be provied, typically is used to update the a state vaiable called themes"*/
class ThemeSelect extends Component {
  state = {
    Themes: [''],
    selectedOption: [''],
    Show: false
  };

  /* This component requires that all options be configured using the following object [{ value : 'the value', label: 'What is seen'}] 
    This could be done on the server, or even the db could be configured or mapped for right now it is done on the client*/
  componentDidMount() {
    axios.get('/api/theme/getthemes').then(response => {
      console.log(response, 'These are the themes');
      let themesForDisplay = [];
      for(let x = 0 ; x < response.data.length; x++){
        themesForDisplay[x] = {value: response.data[x], label: response.data[x]}
      }
      this.setState({ Themes: themesForDisplay });
      
    });
    sessionStorage.removeItem('SearchThemes')
  }

  handleChange = selectedOption => {
    console.log('this is selected option')
    const storage = sessionStorage.getItem(this.props.destination.replace(/\s/g, '')) === null ? '' :  sessionStorage.getItem(this.props.destination.replace(/\s/g, '')).split(',')
    
    this.setState({ selectedOption });
    let newThemes = []
    let add = true
    for(let x = 0 ; x < storage.length; x++){
      if(selectedOption.label === storage[x])
        add = false
      newThemes[x] = storage[x]
    }
    if(add)
        newThemes.push(selectedOption.label)
    if(newThemes.length < 1){
        newThemes = null
    }
    sessionStorage.setItem(this.props.destination.replace(/\s/g, ''), newThemes)
    this.forceUpdate()
  };


  renderAgain = () => {
      this.forceUpdate();
  }
  
  handleCheck = (event) => {
      let show = !this.state.Show
      this.setState({Show:show})
      if(this.props.withThemes === true){
        console.log('heandelsheckhappened', this.props.withThemes)
        this.props.themeSearch()
      }
  }


  render() {
      let showThemes = <div></div>
      
      let themesToDisplay = ''
      try{
          themesToDisplay = sessionStorage.getItem(this.props.destination.replace(/\s/g, '')).split(',')
        } catch(err) {
            console.log('Error is haps')
            themesToDisplay = ''
        }
        console.log('this is themesToDisplay', themesToDisplay)
        if(this.props.always === true)
        {
            return(
                <Filler>
                <Grid xs={12} item>
                       <Select
                            onChange={this.handleChange}
                            options={this.state.Themes}S
                            placeholder={'Select A Theme'}
                            hideSelectedOptions={true}
                        />
                </Grid>
                <Grid style={{marginTop:32}} xs={12}item>
                    <ThemeBox themes={themesToDisplay} reset={this.renderAgain} destination={this.props.destination.replace(/\s/g, '')}  />
                </Grid>
            </Filler>
            )
        }
      if(this.state.Show === true){
        showThemes = 
            <Filler>
                <Grid xs={12} item>
                       <Select
                            onChange={this.handleChange}
                            options={this.state.Themes}
                            placeholder={'Select A Theme'}
                            hideSelectedOptions={true}
                        />
                </Grid>
                <Grid style={{marginTop:32}} xs={12}item>
                    <ThemeBox  reset={this.renderAgain} destination={this.props.destination.replace(/\s/g, '')} themes={themesToDisplay}  />
                </Grid>
            </Filler>
      }
      return(
      <Grid container xs={12}>
        <Grid xs={4}>
            <FormControlLabel
            control={
              <Checkbox
                checked={this.state.Show}
                onChange={this.handleCheck}
                
              />
            }
            label="Search With Themes"
      />
        </Grid>
        {showThemes}
        
      </Grid>)
  }
}
export default ThemeSelect;