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
        console.log('This is id in view,', this.props.id)
        this.props.addFavorites(this.props.id)
    }

   

    download = () => {
        Axios({
            url: this.props.documentLink,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            //link.target = '_blank';
            link.setAttribute('download', this.props.title+'.'+this.props.fileType);
            document.body.appendChild(link);
            link.click();
          });
    }

    render(){
        
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
                            <Grid xs={10}><ViewDocument id={this.props.id} addFavorites={this.props.addFavorites}></ViewDocument></Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>
                )
        }
        return(
        <Grid container spacing={24} style={{marginTop: '2%'}}>
            <Grid container item xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <Button style={{marginRight:4, marginLeft:4}}variant='contained' color={'primary'} fullWidth  onClick={this.download}>Download</Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth onClick={this.addToFavorite}>Add to favorites</Button>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <Button style={{marginRight:4, marginLeft:4}} variant='contained' color={'primary'} fullWidth>Print</Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth>Edit</Button>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </Grid>
        )
    }
}
export default Actions