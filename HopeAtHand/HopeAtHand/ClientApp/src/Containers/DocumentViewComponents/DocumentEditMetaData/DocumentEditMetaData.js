import React, {Component} from 'react'
import {Typography, Grid, Button, Paper, TextField, FormControl} from '@material-ui/core'
import Heading from '../../../components/UI Components/Heading/Heading'
import BigHeading from '../../../components/UI Components/Heading/BigHeading'
import Star from '@material-ui/icons/StarBorder'
import ReusableThemeSelect from '../../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
import Filler from '../../../components/HOC/Filler'
import EX from '@material-ui/icons/Close'
import Axios from 'axios'
class DocumentEditMetaData extends Component{

    state={
        NewName : "",
    }

    componentDidMount(){
        let string = ""
        for(let x = 0 ;x < this.props.document.themes.length; x++){
            if((x + 1) != this.props.document.themes.length){
                string += this.props.document.themes[x].themeName + ','
            } else {
                string += this.props.document.themes[x].themeName
            }
        }
        console.log('This is the value of string', string, this.props.document.themes)
        sessionStorage.setItem("DocumentEdit", string)
    }

    DownloadDocument = () => {
      
            Axios({
                url: this.props.document.documentBlobURL,
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.setAttribute('download', this.props.document.title+'Document.'+this.determineFileEnding(this.props.document.documentBlobURL));
                document.body.appendChild(link);
                link.click();
              });
    }

    DownloadPicture = () => {
       
            console.log(this.props.document.outlineURl, "is being downloaded")
            Axios({
                url: this.props.document.imageURL,
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.setAttribute('download', this.props.document.title+'Document.'+this.determineFileEnding(this.props.document.imageURL));
                document.body.appendChild(link);
                link.click();
              });
    }

    determineFileEnding = (document) => {
        if(document === "" | document === null)
          return ""
        return(document.substring(document.length -7).split('.')[1].toLowerCase())
      }

      UpdateName = (event) => {
          this.setState({NewName:event.target.value})
      }

      SaveName = () => {
          this.props.updateDocumentName(this.state.NewName)
      }

      Document = () => {
        this.props.postData('Document')
     }
        Picture = () => {
        this.props.postData('Picture')
        }

    render(){
        console.log(this.props, this.state, 'This is in the LessonPlan Viewer Data Component')
        let themes = []
        let documents = []
        console.log(this.props.document)
        if(this.props.document != null){
            for(let x = 0 ;x < this.props.document.themes.length; x++){
                themes.push(this.props.document.themes[x].themeName)
            }
        }
          console.log(documents)
        
        if(this.props.document === null)
            return <p>Loading</p>
        return(
            <Filler>
                <Paper style={{padding:4, margin:8}}>
                    <Grid container>
                        <Grid item xs={1} style={{paddingTop:8, textAlign:'left'}}>
                            <Button  onClick={this.props.cancelDocumentView}><EX color='Error' style={{textAlign:'left'}} fontSize='large' onClick={this.props.cancelDocumentView}/></Button>
                        </Grid>
                        <Grid item xs={4} style={{paddingTop:8}}>
                            <BigHeading>Name : {this.props.document.title}</BigHeading>
                        </Grid>
                        <Grid item xs={4} className={'test2'}>
                            <TextField variant='standard' fullWidth onChange={this.UpdateName} label="Enter a new title for the document"/>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant='contained' color='secondary' fullWidth onClick={this.SaveName} disabled={(this.state.NewName === "" ?  true : false)}>Update Name</Button>
                        </Grid>
                        <Grid item xs={1} style={{paddingTop:8, textAlign:'right'}}>
                            <Button><Star color='primary' style={{textAlign:'right'}} fontSize='large'/></Button>
                        </Grid>

                        <Grid item xs={12} style={{paddingTop:8}}>
                            <BigHeading>Document Type : {this.props.type}</BigHeading>
                        </Grid>

                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid xs={1}></Grid>
                            <Grid xs={4} item><Button variant='contained' color='primary' onClick={this.DownloadDocument} fullWidth>Download Document</Button></Grid>
                            <Grid xs={3} item><Button variant='contained' color='primary' onClick={this.DownloadPicture} fullWidth>Download Picture</Button></Grid>
                            <Grid xs={3} item><Button variant='contained' color='primary' onClick={this.props.cancelEditing} fullWidth>Cancel Editing</Button></Grid>
                            <Grid xs={1}></Grid>
                        </Grid>

                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} item>
                                <label style={{width: '100%'}} htmlFor="Document"><Button variant='contained' color='secondary' fullWidth component="span">Select New Document</Button></label></Grid>
                            <Grid item xs={4} className={'test2'}><TextField variant='standard' fullWidth disabled value={this.props.displayDocument}></TextField></Grid>
                            <Grid item xs={3}><Button disabled={(this.props.displayDocument === "Please Select A New Document" ? true:false)} variant='contained' 
                                color='secondary' fullWidth onClick={() => this.props.postData("Document") }>Save Changes to Document</Button></Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} item>
                                <label style={{width: '100%'}} htmlFor="Picture"><Button variant='contained' color='secondary' fullWidth component="span">Select New Picture</Button></label></Grid>
                            <Grid item xs={4} className={'test2'}><TextField variant='standard' fullWidth disabled value={this.props.displayPicture}></TextField></Grid>
                            <Grid item xs={3}>
                                <Button disabled={(this.props.displayPicture === "Please Select A New Picture" ? true : false)} 
                                    variant='contained' color='secondary' fullWidth onClick={() => this.props.postData("Picture")}>Save Changes to Picture</Button></Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>

                        <Grid xs={12} item container style={{marginTop:16}}>
                            <Grid xs={12} item><BigHeading style={{padding:8}}>Themes</BigHeading></Grid>
                            <Grid xs={1} item></Grid>
                            <Grid xs={10} item style={{padding:16}}>
                                <ReusableThemeSelect always={true} destination="Document Edit" style={{padding:8}}/>
                            </Grid>
                            <Grid xs={1} item></Grid>
                        </Grid>
                        <Grid xs={12} item container spacing={8}>
                            <Grid xs={1} item></Grid>
                            <Grid xs={10} item style={{padding:16}}> 
                                <Button variant='contained' color='secondary' fullWidth style={{padding:8}} onClick={this.props.updateThemes}>Update Themes</Button>
                            </Grid>
                            <Grid xs={1} item></Grid>
                        </Grid>
                    </Grid>
                    <input onChange={this.props.selectDocument}
                            style={{ display: 'none' }}
                            id="Document"
                            multiple
                            type="file"
                            />
                       
                        <input onChange={this.props.selectPicture}
                            style={{ display: 'none' }}
                            id="Picture"
                            multiple
                            type="file"
                        />
                </Paper>
            </Filler>
        )
    }
}
                        

export default DocumentEditMetaData