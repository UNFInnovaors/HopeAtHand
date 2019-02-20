import React, { Component } from 'react'
import {Grid, Typography, Button, Paper } from '@material-ui/core'
import Heading from '../../UI Components/Heading/Heading'
import ReactImageMagnify from 'react-image-magnify';

class ViewComponent extends Component{

    state = {
        ImageIndex: 0,
    }

    componentDidMount(){

    }
    Next = () => {
        if(this.state.ImageIndex + 1 >= this.props.urls.length)
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
            this.setState({ImageIndex: this.props.urls.length -1})
        } else {
            let newIndex = this.state.ImageIndex
            this.setState({ImageIndex: newIndex -1})
        }
    }
    render(){
        if(this.props.urls === null){
            return <Paper> <p>Loading</p></Paper>
        }
        let width= window.screen.width/2.09
        console.log(width)
        return(
            <Paper style={{margin:4, padding:4}}>
                <Grid item container xs={12} spacing={16}>
                    <Heading>Document Viewer</Heading>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <Typography variant='body1'>Lesson Plan : {this.props.urls[0].name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='body1' align='right'>Document in viewer : {this.props.urls[this.state.ImageIndex].name}</Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    
                    
                    
                    <Grid item container xs={12}>
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
                    <Grid item xs={12} style={{textAlign:'center'}}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: this.props.urls[this.state.ImageIndex].name + "Was unable to load",
                                isFluidWidth: false,
                                src: this.props.urls[this.state.ImageIndex].image,
                                width: width,
                                height: 900
                            },
                            largeImage: {
                                src: this.props.urls[this.state.ImageIndex].image,
                                width: 1400,
                                height: 1700
                            }
                        }}/>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default ViewComponent