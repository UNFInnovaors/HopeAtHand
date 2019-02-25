import React, { Component } from  'react'
import Filler from '../../HOC/Filler'
import {get, post} from '../../Axios/Instances'
import ImageViewer from '../ImageViewerComponent/ImageViewComponent'
import DocumentMetaData from '../../../Containers/DocumentViewComponents/DocumentMetaData/DocumentData'
import DocumentEditMetaData from '../../../Containers/DocumentViewComponents/DocumentEditMetaData/DocumentEditMetaData'
import Snackbar from '../../UI/SnackBar/Snackbar';
import axios from 'axios'

class DocumentView extends Component {
    state = {
      Document: null,
      Type:null,
      View:"Document",
      ImageIndex : 0,
      URLS: null,
      Editing : false,
      DisplayDocument: "Please Select A New Document",
      DisplayPicture: "Please Select A New Picture"
    };

    componentDidMount(){ //+ props.document.documentId
         let id = -1;
         if(typeof(this.props.viewDocument["writingAssignmentId"]) !== 'undefined' && this.props.viewDocument["writingAssignmentId"] !== null){
             id = this.props.viewDocument.writingAssignmentId;
         } else if(typeof(this.props.viewDocument["poemId"]) !== 'undefined' && this.props.viewDocument["poemId"] !== null){
            id = this.props.viewDocument.poemId
         }
         else if(typeof(this.props.viewDocument["artPieceId"]) !== 'undefined' && this.props.viewDocument["artPieceId"] !== null){
            id = this.props.viewDocument.artPieceId
         }
         this.setState({Id:id})
         this.onLoad(id)
        }

    onLoad = (id) => {
      get('/Document/GetFullDocument/'+id).then( res => {
        console.log(res)
        const data = res.data
        let urls = []
        urls.push({image:data.document.imageURL, name:data.document.title})
        console.log(urls)
        this.setState({Document: data.document,
                        Type:data.type,
                       URLS:urls
                      })
        }).catch( err => console.log(err))
      this.setState({ open: true });
    };

    Next = () => {
        if(this.state.ImageIndex + 1 > this.props.components.length){
            this.setState({ImageIndex:0})
        }
        else{
            let newIndex = this.state.ImageIndex
            this.setState({ImageIndex: newIndex + 1 })
        }
    }

    EnableEditing = () => {
      this.setState({Editing: true})
    }

    CancelEditing = () => {
      this.setState({Editing:false})
    }

    /*These method control the editing of componenets*/
    UpdateDocumentName = (newName) => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update: newName
      }
      post('/Document/UpdateName', updateDTO).then(res => {
        console.log(res)
        let document = JSON.parse(JSON.stringify(this.state.Document))
        document.title = res.data
        this.setState({Document: document})
      })
    }

    UpdateThemes = () => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update : sessionStorage.getItem("DocumentEdit")
      }
      console.log('THis is the updateDTO', updateDTO)
      post('Document/UpdateThemesFromEdit', updateDTO).then( res => {
        this.setState({Open: true, Message:'Themes Have Been Successfully Updated'})
      })
    }
    Close = () => {
      this.setState({Open:false})
    }

    SelectDocument = (event) => {
      this.setState({NewDocument: event.target.files[0], DisplayDocument: event.target.files[0].name && "Ready To Upload"})
    }

    SelectPicture = (event) => {
      this.setState({Picture: event.target.files[0],  DisplayPicture: event.target.files[0].name && "Ready To Upload"})
    }

    PostData = (location) => {
      /*if(!this.validatePostData())
         return*/
      
       var file=null
       switch(location){
         case 'Document':
          file=this.state.NewDocument
          break;
         case 'Picture':
          file=this.state.Picture
          break;
       }
       var bodyFormData = new FormData();
       bodyFormData.set('file', file)
       bodyFormData.set('Id', this.state.Id)
       
       console.log(bodyFormData)
       axios.post('/api/Document/'+location,bodyFormData,{
         headers:{
                       'Content-Type': 'multipart/form-data; boundary=absdfabs',
                       'Content-Disposition': 'form-data'
        }}).then(res => {
           console.log(res)
           if(res.data === null){
             this.setState({Loading: false, Error: true})
           }
           this.setState({Loading:false,       
           DisplayDocument: "Please Select A New Document",
           DisplayPicture: "Please Select A New Picture", 
           Open:true, 
           Message:"File Upload Successful"})
           this.onLoad(this.state.Id);
       })
       this.setState({Loading: true})
     }


  
    render() {
      console.log(this.state, this.props, "state and props in new Document View")
      const metaDataViewer = this.state.Editing === false ? 
          
          <DocumentMetaData style={{marginTop:16}} 
          enableEditing={this.EnableEditing} document={this.state.Document}
           type={this.state.Type}/>          : 

          <DocumentEditMetaData style={{marginTop:16}} 
          cancelEditing={this.CancelEditing} document={this.state.Document} 
           updateDocumentName={this.DocumentName} updateThemes={this.UpdateThemes}
           postData = {this.PostData} displayDocument={this.state.DisplayDocument}  displayPicture={this.state.DisplayPicture}
           selectDocument={this.SelectDocument}  selectPicture={this.SelectPicture}  type={this.state.Type}/>

      
        return(
            <Filler>
                {metaDataViewer}
                <ImageViewer urls={this.state.URLS}/>
                <Snackbar open={this.state.Open} message={this.state.Message} close={this.Close}/>
            </Filler>
      );
    }
}
  
  // We need an intermediary variable for handling the recursive nesting.
  
  export default DocumentView;
