import React, { Component } from 'react'
import { Grid, Select, Divider, Button, Typography, TextField } from '@material-ui/core';
import Filler from '../../components/HOC/Filler'
import ThemeSelector from '../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
import Heading from '../../components/UI Components/Heading/Heading'
//import ThemeSelect from '../../components/UI/ThemeSelect/LeesonPLanThemes';
import Action from './CreateAction/CreateAction'
import Components from './ComponentsForDDisplay/ComponentsForDisplay'
import { Paper } from '@material-ui/core';
import ReactImageMagnify from 'react-image-magnify';

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
        ImageIndex:0
    }

    handelChange = (event) => {
        var cloneState = JSON.parse(JSON.stringify(this.state.CreateForm))
        cloneState["Controls"][0]["value"] = event.target.value
        console.log(cloneState);
        this.setState({CreateForm: cloneState})
    }

    Next = () => {
        if(this.state.ImageIndex + 1 > this.props.components.length)
        {
            this.setState({ImageIndex:0})
        }
        else{
            let newIndex = this.state.ImageIndex
            this.setState({ImageIndex: newIndex + 1 })
        }
    }
    Back = () => {
        if(this.state.ImageIndex -1 < 0){
            this.setState({ImageIndex: this.props.components.length -1})
        } else {
            let newIndex = this.state.ImageIndex
            this.setState({ImageIndex: newIndex -1})
        }
    }
    //<ThemeSelect updateThemes={this.props.alterThemes} removeTheme={this.props.removeTheme} themes={this.props.themes}/>
    render(){
        let form = this.state.CreateForm.Controls
        let aUrl = null
        let rUrl = null
        let urls = []
        if(this.props.lessonPlanImage !== null)
        {
            urls.push(URL.createObjectURL(this.props.lessonPlanImage));
             
        }
        for(let x = 0 ; x < this.props.components.length; x++)
        {
            urls.push(this.props.components[x].image)
        }
        console.log('This is the form', form)
        return(
            <Filler>
                <Grid container spacing={24}>
                    <Paper style={{padding:14, width:'100%', margin:'5%', marginBottom: '1%' }}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5">{(this.props.isNew === true ? "Create New Lesson Plan" : "Edit Incomplete Lesson Plan")}</Typography>
                        </Grid>
                        <Grid container item spacing={24} style={{paddingTop:28}}>
                             
                            <Grid xs={6} item container spacing={8} style={{paddingTop:6}}>
                                <Grid xs={12} className='test1'>
                                    <TextField value={this.props.lessonPLanNameKs} placeholder="Please choose the name of your lesson plan" fullWidth error={form[0].error} helperText={form[0].errorMessage} 
                                        type={form[0].config.type} label={form[0].label} fullWidth hidden={form[0].hidden} onChange={this.props.lessonPlanNameChangeHandler}> 
                                    </TextField>
                                </Grid>
                                <Grid item xs={5}>
                                    <label style={{width:'100%'}} htmlFor="Complete_Lesson">
                                        <Button fullWidth variant="contained" color={"primary"} component="span">Upload Complete Lesson</Button>
                                        <input onChange={ this.props.selectFile}
                                            style={{ display: 'none' }}
                                            id="Complete_Lesson"
                                            multiple
                                            type="file"
                                        />
                                    </label> 
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField fullWidth disabled  value={(this.props.complete_Lesson === null ? "Please upload complete lesson" :  this.props.complete_Lesson.name)}></TextField>
                                </Grid>
                                <Grid item xs={5}>
                                    <label style={{width:'100%'}} htmlFor="OutlineDocument">
                                        <Button fullWidth variant="contained" color={"primary"} component="span">Upload Lesson Outline Document</Button>
                                        <input onChange={ this.props.selectFile}
                                            style={{ display: 'none' }}
                                            id="OutlineDocument"
                                            multiple
                                            type="file"
                                        />
                                    </label> 
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField fullWidth disabled  value={(this.props.outlineDocument === null ? "Please upload document outline" : this.props.outlineDocument.name)}></TextField>
                                </Grid>
                                <Grid item xs={5}>
                                    <label style={{width:'100%'}} htmlFor="OutlinePicture">
                                        <Button fullWidth variant="contained" color={"primary"} component="span">Upload a picture of the outline</Button>
                                        <input onChange={ this.props.selectFile}
                                            style={{ display: 'none' }}
                                            id="OutlinePicture"
                                            multiple
                                            type="file"
                                        />
                                    </label> 
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField fullWidth disabled  value={(this.props.lessonPlanImage === null ? "Please upload a picture of the outline" : this.props.lessonPlanImage.name)}></TextField>
                                </Grid>
                            </Grid>
                            <Grid xs={6} item container> <ThemeSelector destination={'LessonThemes'} always={true}/>
                                <Grid xs={12} item container spacing={8} style={{paddingTop: 18}}>
                                    <Grid xs={1} item></Grid>
                                    <Grid xs={5} item><Button fullWidth variant='contained' color='primary'> Validate Upload</Button></Grid>
                                    <Grid xs={5} item><Button fullWidth variant='contained' color='primary'> Next Step</Button></Grid>
                                    <Grid xs={1} item></Grid>
                                    
                                </Grid>
                            </Grid>
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
                            <Action addComponent={this.props.addComponent} 
                                    action={this.props.action} isUpload={true} 
                                    changeAction={this.props.changeAction}
                                    addToLesson={this.props.addToLesson}
                                    removeFromLesson={this.props.removeFromLesson}
                                    addFavorites={this.props.addFavorites}></Action>
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
                                                removeFromLesson={this.props.removeFromLesson}
                                                addFavorites={this.props.addFavorites}
                                            ></Components></Grid>)}     
                    
                </Grid>
                        {(urls.length > 0 ? 
                    <Paper style={{width:'100%', margin:8, padding:12}}>
                        <Heading>Document Viewer</Heading>
                        {(urls.length > 1 ? 
                            <Grid item container xs={12} style={{marginTop:12}}>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={4}>
                                    <Button onClick={this.Back} fullWidth variant='contained' color='primary'>Previous Image</Button>
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={4}>
                                    <Button onClick={this.Next} fullWidth variant='contained' color='primary'>Next Image</Button>
                                </Grid>                
                                <Grid item xs={1}></Grid>
                            </Grid>
                         : "")}
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Upload a file to active viewer',
                                isFluidWidth: false,
                                src: urls[this.state.ImageIndex],
                                width: 700,
                                height: 900
                            },
                            largeImage: {
                                src: urls[this.state.ImageIndex],
                                width: 1400,
                                height: 1700
                            }
                        }} />
                    </Paper> : "")}
               
                
            </Filler>
            
        )
    }
}
/*<Grid container item xs={12}> <Paper style={{padding:'24px', width:'90%'}}>{this.props.components.map((item, index) => {
                             return <Grid key={index} item container xs={4}><Components item={item}/></Grid>
                         })}</Paper></Grid>)} 
                         
                                             <Grid container xs={12}>
                        <Grid container item xs={10}><Heading>Image Preview</Heading><img src={urls[this.state.ImageIndex]} height={1000} width={'70%'} style={{margin:8}}/></Grid>
                        <Grid xs={2}>
                            <Button onClick={this.Next} disabled={this.props.components.length === 0} fullWidth variant='contained' color={'primary'}>Next Image</Button>
                        </Grid>
                    </Grid>*/
export default CreateDumbComponent