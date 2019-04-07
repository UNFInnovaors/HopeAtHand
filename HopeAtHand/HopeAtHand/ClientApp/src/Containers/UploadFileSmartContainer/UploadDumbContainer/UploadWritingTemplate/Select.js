import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem'
import { Grid, TextField, Button } from '@material-ui/core'
import { post, get } from '../../../../components/Axios/Instances'
import Add from '@material-ui/icons/ControlPoint'
import Cancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip';

/*To Use this component you must include a prop for :
  valuesForOptions and changeStateOfOptions
*/
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class ReuseableSelect extends Component {
  state = {
    baseTemplate:[{writingTemplateId: -2, name: "Select The Writing Template Type"},{writingTemplateId: -1, name: "Create New Template Type"}],
    templates: [],
    selectedValue: 'Select The Writing Template Type',
    TemplateName: ""
  };
  componentDidMount() {
    get('/WritingTemplate/GetTemplates').then(res => {
      this.setState({templates: res.data})
    })
  }

  
  handleChange = event => {
    let id = -1
    for(let x = 0 ; x < this.state.templates.length; x++){
      if(this.state.templates[x].name === event.target.value){
        id = this.state.templates[x].writingTemplateId
        console.log('id is ', id)
      }
    }
    if(id > -1)
    this.props.updateTemplate(id)
    this.setState({ selectedValue: event.target.value });
    //this.props.changeStateOfOptions(event.target.value);
  };

  type = (event ) => {
    this.setState({TemplateName: event.target.value})
  }

  Cancel = () =>{
    this.setState({selectedValue: 'Select The Writing Template Type',})
  }

  postTemplate = () => {
    const CreateTemplateDTO = {
      TemplateName : this.state.TemplateName
    }
    post('/WritingTemplate/CreateTemplate', CreateTemplateDTO).then( res => {
      if(res.data === "Success"){
        get('/WritingTemplate/GetTemplates').then(res => {
          this.setState({templates: res.data,  selectedValue: 'Select The Writing Template Type',})
        })
      }
    })
  }
  render() {
    console.log('This is state in template maker', this.state)
    const options = [...this.state.baseTemplate, ...this.state.templates]
    if(this.state.selectedValue === "Create New Template Type"){
      return(
        <Grid container >
          <Grid item xs={8}>
            <TextField label='Enter New Template Type' variant='standard' fullWidth onChange={this.type}></TextField>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth onClick={this.postTemplate} disabled={(this.state.TemplateName === "" ? true : false)} color='secondary' onClick={this.postTemplate}><Tooltip title="Add"><Add/></Tooltip></Button>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth onClick={this.postTemplate} color='error' onClick={this.Cancel}><Cancel/></Button>
          </Grid>
        </Grid>
      )
    }
    return (
        <FormControl style={{marginTop:36}}
          variant='outlined'
          fullWidth
          style={{fontSize:18}}
          label="Select The Writing Template Type"
        >
          <Select style={{fontSize:18, marginTop:14}}
            //native //props.native
            value={this.state.selectedValue} //props. defaults
            onChange={this.handleChange} //props. handler
            fullWidth
            MenuProps={MenuProps}
            label="Select The Writing Template Type"
          >
            {options.map(
              (aTheme, index) => (
                <MenuItem
                  style={{fontSize:18}}
                  disabled={aTheme.name === this.state.baseTemplate[0].name}
                  key={aTheme.writingTemplateId}
                  value={aTheme.name}
                >
                  {aTheme.name}
                </MenuItem>
              ) //props for more things...
            )}
          </Select>
        </FormControl>
    );
  }
}

export default ReuseableSelect;
