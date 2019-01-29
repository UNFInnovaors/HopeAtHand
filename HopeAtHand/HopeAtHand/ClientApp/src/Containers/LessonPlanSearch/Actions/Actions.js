import React from 'react'
import { Grid, Button } from '@material-ui/core';

class Actions extends React.Component{


    state = {

    }

    componentDidMount(){

    }

    addToLesson = () =>{
        //console.log(this.props)
        this.props.addToLesson(this.props.documentData)
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
                    <Grid container item xs={12}>
                        <Grid item xs={1}></Grid>
                            <Grid xs={10}><Button variant='contained' color='primary' fullWidth>View Document</Button></Grid>
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
                    <Button style={{marginRight:4, marginLeft:4}}variant='contained' color={'primary'} fullWidth>View Document</Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <Button style={{marginRight:4}} variant='contained' color={'primary'} fullWidth>Add to favorites</Button>
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