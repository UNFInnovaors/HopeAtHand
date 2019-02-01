import React,  {Component} from 'react'

import Actions from '../../../../LessonPlanSearch/Actions/Actions'

import { Grid, Paper, Button, Typography} from '@material-ui/core'
import Heading from '../../../../../components/UI Components/Heading/Heading'
import Filler from '../../../../../components/HOC/Filler'

class ResultsDisplayModule extends Component{

    state = {

    }

    componentDidMount(){

    }

    render(){
        const imageURL = this.props.documentData.imageURL.length > 0 ? this.props.documentData.imageURL : 'https://htmljs.blob.core.windows.net/images/download.jpg'
        
        if(typeof(this.props.documentData["writingAssignmentId"]) !== 'undefined' && this.props.documentData["writingAssignmentId"] !== null)
        {
            console.log('this was choosen')
            return(
                <Paper style={{margin:16}}>
                    <img style={{borderColor:'black', borderBottomWidth:1, borderStyle:'solid'}} height="200" width="100%" src={imageURL} alt="No Image"></img>
                    <Typography style={{marginTop:12}} variant='headline' align='center'><b>{this.props.documentData.title}</b></Typography>
                    <Typography style={{marginTop:12}} variant='subheading' align='center'>Suggested Age Group : {this.props.documentData.ageGroup}</Typography>
                    <Actions isUpload={this.props.isUpload} 
                             documentData={this.props.documentData}
                             addToLesson={this.props.addToLesson}
                             id={this.props.documentData.writingAssignmentId}
                             addFavorites={this.props.addFavorites}
                             />
                </Paper>)
        }
        else if(typeof(this.props.documentData["artPieceId"]) !== 'undefined' && this.props.documentData["ArtPieceId"] !== null)
        {
            return(
            <Paper style={{margin:8}}>
                    <img style={{borderColor:'black', borderBottomWidth:1, borderStyle:'solid'}} height="200" width="100%" src={imageURL} alt="No Image"></img>
                    <Typography style={{marginTop:12}} variant='headline' align='center'><b>{this.props.documentData.title}</b></Typography>
                    <Typography style={{marginTop:12}} variant='subheading' align='center'>Supplies Needed: {this.props.documentData.SuppliesNeeded}</Typography>
                    <Actions isUpload={this.props.isUpload} 
                             documentData={this.props.documentData}
                             addToLesson={this.props.addToLesson}
                             id={this.props.documentData.artPieceId}
                             addFavorites={this.props.addFavorites}
                             />
                </Paper>)
        }
        else if(typeof(this.props.documentData["poemId"]) !== 'undefined' && this.props.documentData["poemId"] !== null)
        {
            return(
                <Paper style={{margin:16}}>
                    <img style={{borderColor:'black', borderBottomWidth:1, borderStyle:'solid'}} height="200" width="100%" src={imageURL} alt="No Image"></img>
                    <Typography style={{marginTop:12}} variant='headline' align='center'><b>{this.props.documentData.title}</b></Typography>
                    <Typography style={{marginTop:12}} variant='subheading' align='center'>Author : {this.props.documentData.author}</Typography>
                    <Actions isUpload={this.props.isUpload} 
                             documentData={this.props.documentData}
                             addToLesson={this.props.addToLesson}
                             id={this.props.documentData.poemId}
                             addFavorites={this.props.addFavorites}
                             />
                </Paper>)
        }
        else{
            return(
            <Paper style={{margin:16}}>
                    <img height="200" width="100%" src={this.props.documentData.imageURL} alt="No Image"></img>
                    <Heading>Error Loading Document</Heading>
            </Paper>)
        }
       
        
    }
}

export default ResultsDisplayModule