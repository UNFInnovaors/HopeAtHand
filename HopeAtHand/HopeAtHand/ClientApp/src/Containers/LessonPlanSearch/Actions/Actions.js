import React from 'react'
import Axios from 'axios'
import { Grid, Button } from '@material-ui/core';
import ViewDocument from '../../../components/UI Components/Modals/ViewDocument'

class Actions extends React.Component{


    state = {

    }

    componentDidMount(){

    }

    addToLesson = () =>{
        //console.log(this.props)
        this.props.addToLesson(this.props.documentData)
    }
    addToFavorite = () => {
        //console.log('This is id in view,', this.props.id)
        this.props.addFavorites(this.props.id)
    }

   

    download = () => {
        //console.log(this.props.documentLink, "is being downloaded")
        Axios({
            url: this.props.documentLink,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', this.props.title+'.'+this.props.fileType);
            document.body.appendChild(link);
            link.click();
          });
    }

    beginLessonPlanView= () => {
        //console.log('this is happening', this.props)
        this.props.beginLessonPlanView(this.props.documentData)
    }

    BeginDocumentView = () => {
        //console.log('This is to begin the document view', this.props.documentData)
        this.props.beginDocumentView(this.props.documentData)
    }

    render(){
        //console.log('This is the props of actions', this.props)
        if(this.props.isUpload)
        {
            return(
                <Grid container spacing={24} style={{marginTop: '2%'}}>
                    <Grid container item xs={12}>
                        <Grid item xs={1}></Grid>
                            <Grid xs={10}><Button variant='contained' color='primary' fullWidth onClick={this.addToLesson}>Add To Lesson</Button></Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <Grid container item xs={12} >
                        <Grid item xs={1}></Grid>
                            <Grid xs={10}><Button style={{marginRight:4, marginLeft:4}} variant='contained' color={'primary'} fullWidth onClick={this.BeginDocumentView}>View Document</Button></Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>
                )
        }
        else if(this.props.isLessonPlan){
            return(
                <Grid container spacing={24} style={{marginTop: '2%'}}>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4, marginLeft:4}} variant='contained' color={'primary'} fullWidth onClick={this.beginLessonPlanView}>View Lesson Plan</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4, marginLeft:4}}variant='contained' color={'primary'} fullWidth  onClick={this.download}>Download</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth onClick={this.beginLessonPlanView}>Add To Favorites</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
            )
        }
        
        else if(this.props.isLessonPlanComponent){
            return(
                <Grid container spacing={24} style={{marginTop: '2%'}}>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4, marginLeft:4}} variant='contained' color={'primary'} fullWidth onClick={this.BeginDocumentView}>View Document</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4, marginLeft:4}}variant='contained' color={'primary'} fullWidth onClick={this.download}>Download</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth onClick={this.beginView}>Add To Favorites</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
                )
        }else{
            return(
                <Grid container spacing={24} style={{marginTop: '2%'}}>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4, marginLeft:4}} variant='contained' color={'primary'} fullWidth onClick={this.BeginDocumentView}>View Document</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4, marginLeft:4}}variant='contained' color={'primary'} fullWidth  onClick={this.download}>Download</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth onClick={this.beginView}>Add To Favorites</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
        )}
    }
}
export default Actions
/*<Grid item xs={4}>
                            <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth onClick={this.addToFavorite}>Add to favorites</Button>
                        </Grid>*/