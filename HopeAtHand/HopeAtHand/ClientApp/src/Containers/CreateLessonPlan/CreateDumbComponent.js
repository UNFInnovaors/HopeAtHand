import React, { Component } from 'react'
import { Grid, Select, Divider, Button, Typography, TextField } from '@material-ui/core';
import Filler from '../../components/HOC/Filler'
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import ThemeSelect from '../../components/UI/ThemeSelect/LeesonPLanThemes';
import ThemeBox from '../../components/UI/ThemeBox/ThemeBox'
import DoneIcon from '@material-ui/icons/Done';
import Action from './CreateAction/CreateAction'
import Components from './ComponentsForDDisplay/ComponentsForDisplay'
import { Paper } from '@material-ui/core';

class CreateDumbComponent extends Component {
    componentDidMount(){
    }
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
        SelectedThemes:["Hello", "Dolly"],
    }

    handelChange = (event) => {
        var cloneState = JSON.parse(JSON.stringify(this.state.CreateForm))
        cloneState["Controls"][0]["value"] = event.target.value
        console.log(cloneState);
        this.setState({CreateForm: cloneState})
    }
    render(){
        let CreateForm = (this.state.CreateForm.Controls)
        let eachComponent = (<Filler><Typography variant="body2">Now there are components</Typography></Filler>)
        let form = this.state.CreateForm.Controls
        console.log('This is the form', form)
        let chips = this.state.SelectedThemes.map((theme, index) => <Chip variant="outlined" key={index} color={"primary"} label={theme} deleteIcon={<DoneIcon />}/>)
        return(
            <Filler>
                <Grid container spacing={24}>
                    <Paper style={{padding:14, width:'100%', margin:'5%', marginBottom: '1%' }}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5">{(this.props.isNew === true ? "Create New Lesson Plan" : "Edit Incomplete Lesson Plan")}</Typography>
                        </Grid>
                        <Grid container item spacing={24} style={{paddingTop:28}}>
                            <Grid item xs={1}></Grid>    
                            <Grid xs={4} item><TextField value={this.props.lessonPLanNameKs} placeholder="Please choose the name of your lesson plan" fullWidth error={form[0].error} helperText={form[0].errorMessage} 
                                                type={form[0].config.type} label={form[0].label} fullWidth hidden={form[0].hidden} onChange={this.props.lessonPlanNameChangeHandler}> 
                                                </TextField></Grid>
                            <Grid xs={6} item><ThemeSelect updateThemes={this.props.alterThemes} removeTheme={this.props.removeTheme} themes={this.props.themes}/></Grid>
                        </Grid>
                        <Grid container item spacing={24} style={{padding:28}}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><ThemeBox themes={this.props.themes}></ThemeBox></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    </Paper>
                    <Grid container item>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4}><Button variant="outlined" fullWidth onClick={() => this.props.changeAction("create")}>Add New Components</Button></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}><Button variant="outlined" fullWidth onClick={() => this.props.changeAction("search")}>Search For Components To Add</Button></Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    {(this.props.action !== null ?
                        <Paper style={{padding:28, width:'100%', margin:'5%', marginBottom: '1%', marginTop: '1%' }}>
                            <Action addComponent={this.props.addComponent} action={this.props.action} isUpload={true} changeAction={this.props.changeAction}></Action>
                        </Paper> :
                    <div></div> )}
                   
                    {(this.props.components.length === 0 ? 
                        <Paper style={{padding:28, width:'100%', margin:'5%', marginBottom: '1%', marginTop: '1%' }}>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5">This Lesson Plan Has No Components</Typography>
                            </Grid> 
                        </Paper>
                         : <Grid item xs={12}><Components 
                                                components={this.props.components} 
                                                uploadLessonPLan={this.props.uploadLessonPLan}
                                            ></Components></Grid>)}     
                    
                </Grid>
                
            </Filler>
            
        )
    }
}
/*<Grid container item xs={12}> <Paper style={{padding:'24px', width:'90%'}}>{this.props.components.map((item, index) => {
                             return <Grid key={index} item container xs={4}><Components item={item}/></Grid>
                         })}</Paper></Grid>)}  */
export default CreateDumbComponent