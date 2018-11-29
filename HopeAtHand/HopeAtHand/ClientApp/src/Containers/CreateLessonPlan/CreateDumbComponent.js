import React, { Component } from 'react'
import { Grid, Select, Divider, Button, Typography, TextField } from '@material-ui/core';
import Filler from '../../components/HOC/Filler'
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import ThemeSelect from '../../components/UI/ThemeSelect/ThemeSelect';
import DoneIcon from '@material-ui/icons/Done';

class CreateDumbComponent extends Component {
    state = {
        CreateForm : {
            Controls : [
                {
                    label: "Lesson PLan Name",
                    value: "",
                    input:"input",
                    isValid:true,
                    touched: false,
                    required: true,
                    disabled: false,
                    hidden: false,
                    error:false,
                    errorMessage:"",
                    index : 0,
                    config : {type:"text", validation : ["standard"]}
                },
                {
                    label: "Themes",
                    value: "",
                    input: "Theme Select",
                    isValid:true,
                    touched: false,
                    required: true,
                    disabled: false,
                    hidden: false,
                    errorMessage:"",
                    index: 1,
                    config : {type:"MultiSelect", validation : ["none"]}
                },
                {
                    label: "Available For Everyone",
                    value: "",
                    input: "input",
                    isValid:true,
                    touched: false,
                    required: true,
                    disabled: true,
                    hidden: false,
                    errorMessage:"",
                    index: 2,
                    config : {type:"checkbox", validation : ["none"]}
                },
                {
                    label: "Complete",
                    value: "",
                    input: "input",
                    isValid:true,
                    touched: false,
                    required: true,
                    disabled: false,
                    hidden: false,
                    errorMessage:"",
                    index: 3,
                    config : {type:"checkbox", validation : ["none"]}
                }
            ]
        },
        SelectedThemes:["Hello", "Dolly"]
    }
    handelChange = event => {

    }
    render(){
        //let CreateForm = (this.state.CreateForm.Controls)
        let form = this.state.CreateForm.Controls
        let chips = this.state.SelectedThemes.map((theme, index) => <Chip variant="outlined" key={index} color={"primary"} label={theme} deleteIcon={<DoneIcon />}/>)
        return(
            <Filler>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h1">{(this.props.isNew === true ? "Create New Lesson Plan" : "Edit Incomplete Lesson Plan")}</Typography>
                    </Grid>
                    <Grid container item spacing={24}>
                        <Grid item xs={1}></Grid>    
                        <Grid xs={4} item><TextField value={form[0].value} placeholder="Please choose the name of your lesson plan" fullWidth error={form[0].error} helperText={form[0].errorMessage} 
                                            type={form[0].config.type} label={form[0].label} fullWidth hidden={form[0].hidden} onClick={this.handelChange}> 
                                            </TextField></Grid>
                        <Grid xs={6} item><ThemeSelect /></Grid>
                    </Grid>
                    <Grid container item spacing={24}>
                        {chips}
                    </Grid>
                </Grid>
                
            </Filler>
            
        )
        }
}

export default CreateDumbComponent