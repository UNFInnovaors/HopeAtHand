import React, { Component } from  'react'
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import {Typography, Grid, Button, Tabs, Tab} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Filler from '../../HOC/Filler'
import {get} from '../../Axios/Instances'
import {Document} from 'react-pdf'
import Heading from '../Heading/Heading';
import FileViewer from 'react-file-viewer';
import blue from '@material-ui/core/colors/blue';
import Actions from '../../../Containers/LessonPlanSearch/Actions/Actions';


function getModalstyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const styles = theme => ({
    paper: {
      position: 'absolute',
      width: '80%',
      height: '90%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 1,
  
    },
  });
  
  class SimpleModal extends React.Component {
    state = {
      open: false,
      Document: null,
      Type:null,
      View:"Document"
    };

    componentDidMount(){ //+ props.document.documentId
        
    }

    
  
    handleOpen = () => {
        get('/Document/GetDocument/'+this.props.id).then( res => {
            console.log(res)
            this.setState({Document: res.data.document,
                           Type: res.data.type,
                           Id: res.data.id})
            
        }).catch( err => console.log(err))
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    ChangeView = () => {
      if(this.state.View === 'Document'){
        this.setState({View : "Image"})
      } else {
        this.setState({View: "Document"})
      }
    }
    determineFileEnding = (document) => {
      if(document === "")
        return ""
      console.log(document.substring(document.length -5).split('.')[1])
      return(document.substring(document.length -7).split('.')[1].toLowerCase())
    }
  
    render() {
      const { classes } = this.props
      console.log(this.props)
      let document = ""
      if(this.state.Document !== null)
        document = this.state.View === 'Document'  ? this.state.Document.documentBlobURL : this.state.Document.imageURL

      const fileType = this.state.Document === null ? null : this.determineFileEnding(document)
      const downloadFileType = this.state.Document === null ? null : this.determineFileEnding(this.state.Document.documentBlobURL)
      const titleForView =  this.state.Document === null ? null :  this.state.Document.title
      let viewer = 
      <Filler>
        <FileViewer
                        fileType={fileType}
                        filePath={document}
                />
                  <Tabs
                    value={this.state.View}
                    onChange={this.ChangeView}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  > 
                    <Tab label="Document View" selected={this.state.View === "Document"} disabled={this.state.View === "Document"} value="Document"/>
                    <Tab label="Picture Vew" selected={this.state.View !== "Document"}  disabled={this.state.View !== "Document"} value="Image"/>
                    
                </Tabs>
      </Filler>
     /* if(fileType === 'pdf')
      {
        viewer = <Document
        file={document}
        
      >
      </Document>
      Axios.get(document, {
        headers: {AllowedOrigin:'*',
        ExposeHeader:"Accept-Ranges",
        ExposeHeader:"Content-Range",
        ExposeHeader:"Content-Encoding",
        ExposeHeader:"Content-Length"
      }
        
      }).then(res => console.log(res))
      }*/
      //console.log(document)
      if(this.state.Document === null)
      {
          return <Filler>
                    <Button color="primary" variant='contained' onClick={this.handleOpen} fullWidth>View Document</Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={(reason) => this.handleClose(reason)}
                    >
                        <div style={getModalstyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Loading
                        </Typography>
                        </div>
                    </Modal>
                </Filler>
      }
      console.log(this.state,'In Viewer')
      return (
        <Filler>
          <Button fullWidth color="primary" variant='contained' onClick={this.handleOpen}>View/Edit Document</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={(reason) => this.handleClose(reason)}
          >
            <div style={getModalstyle()} className={classes.paper}>
              <Heading>{this.state.Type} Viewer</Heading>
              <div style={{width:'92%', height:'50%', textAlign:'center', margin:'auto', border:'2px solid black'}}>
                {viewer}
                <Grid>

                </Grid>
                <Actions documentLink={this.state.Document.documentBlobURL} fileType={downloadFileType} id={this.props.id} title={titleForView} addFavorites={this.props.addFavorites}/>
                </div>
            </div>
          </Modal>
        </Filler>
      );
    }
  }
  
  
  // We need an intermediary variable for handling the recursive nesting.
  const SimpleModalWrapped = withStyles(styles)(SimpleModal);
  
  export default SimpleModalWrapped;

