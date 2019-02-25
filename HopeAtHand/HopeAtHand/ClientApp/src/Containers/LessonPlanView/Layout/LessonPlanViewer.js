import React, {Component } from 'react'
import { Document } from 'react-pdf'
import { Grid, Button, Typography} from '@material-ui/core'
import Axios from 'axios'
class LessonPlanViewer extends Component{

    state = {
        Document : null,
        URLOfDoc : null,
        Fired:false,
        Viewer: null
    }

    componentDidMount(){
        /*Axios.get('./api/LessonPlan/PDFToView', {headers : {'responseType' : 'blob'}}).then( res => {
            console.log(res, 'This is the downloaded document')
            
            const url2 = window.URL.createObjectURL(new Blob([res.data]));
            const viewer2 = <Document filePath={url2}/>
            this.setState({Viewer2:viewer2, Document:'' })
        })*/
        Axios({
            url: './api/LessonPlan/PDFToView',
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
              console.log(response)
              const blobo = new Blob([response.data])
              const url = window.URL.createObjectURL(new Blob([response.data]));
             console.log(url)
            const viewer = <Document file={url} fileType={'blob'}/>
            this.setState({Viewer : viewer, Blobo:blobo})
          });

    }

    render(){
        let viewer = <p>nope</p>
        if(this.state.Blobo === null){
            return <p>Loading</p>
        }
        //console.log(this.state.Document)
        //var blob = new Blob( JSON.stringify(this.state.Document), {type: 'application/pdf'})
        //var url = URL.createObjectURL(blob);
        return (
            <Grid container>
                <Grid xs={7} item>
                   <Document file={this.state.Blobo} fileType={'pdf'}></Document>
                   {this.state.Viewer}
                  <p>?????</p>
                </Grid>
                <Grid xs={5} item></Grid>
            </Grid>
        )
    }
}

export default LessonPlanViewer


/*    componentDidMount(){
        /*Axios.get('./api/LessonPlan/PDFToView', {headers : {'responseType' : 'blob'}}).then( res => {
            console.log(res, 'This is the downloaded document')
            
            const url2 = window.URL.createObjectURL(new Blob([res.data]));
            const viewer2 = <Document filePath={url2}/>
            this.setState({Viewer2:viewer2, Document:'' })
        })
        Axios({
            url: './api/LessonPlan/PDFToView',
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
              console.log(response)
              const blobo = new Blob([response.data])
              const url = window.URL.createObjectURL(new Blob([response.data]));
             console.log(url)
            const viewer = <Document file={url} fileType={'blob'}/>
            this.setState({Viewer : viewer, Blobo:blobo})
          });

    }

    render(){
        let viewer = <p>nope</p>
        if(this.state.Blobo === null){
            return <p>Loading</p>
        }
        //console.log(this.state.Document)
        //var blob = new Blob( JSON.stringify(this.state.Document), {type: 'application/pdf'})
        //var url = URL.createObjectURL(blob);
        return (
            <Grid container>
                <Grid xs={7} item>
                   <Document file={this.state.Blobo} fileType={'pdf'}></Document>
                   {this.state.Viewer}
                  <p>?????</p>
                </Grid>
                <Grid xs={5} item></Grid>
            </Grid>
        )
    }
}

export default LessonPlanViewer*/