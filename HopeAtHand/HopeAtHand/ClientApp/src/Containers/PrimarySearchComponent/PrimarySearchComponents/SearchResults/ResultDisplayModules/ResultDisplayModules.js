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
        console.log(this.props.documentData)
        return(
            <Paper style={{margin:16}}>
                <img height="200" width="100%" src={this.props.documentData.imageURL} alt="No Image"></img>
                <Heading>{this.props.documentData.title}</Heading>
                <Typography>{this.props.documentData.author}</Typography>
                <Actions isUpload={this.props.isUpload} 
                         documentData={this.props.documentData}
                         addToLesson={this.props.addToLesson}
                         />
            </Paper>
        )
    }
}

export default ResultsDisplayModule