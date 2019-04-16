import React, { Component } from 'react'
import axios from 'axios'
import 'azure-storage'
import UploadDumbContainer from './UploadDumbContainer/UploadDumbContainer'

class UploadFileSmartContainer extends Component {
  state = {
    selectedOption: null,
    Loading: false,
    FileToUpload:null,
    Images:null,
    DocumentTypes:['Please Choose The Document Type To Upload','Poem', 'Writing Template', 'Art Piece'],
    SelectedDocumentType:null,
    Themes:[],
    DataAsKVP:{},
    ShouldImageBeUploaded:false,
    ImagesToUpload:[],
    Success: false,
    Error: null,
    Name: "",
    Message: "",
    Open: false,

  }

  initialState= {
    selectedOption: null,
    Loading: false,
    containerName:{type:"password",validation:["lower",{min:0, max:15}],placeHolder:"containerName", required:true, disabled:false, id:"Container"},
    FileToUpload:null,
    BlobService:null,
    Images:null,
    DocumentTypes:['Please Choose The Document Type To Upload','Poem', 'Writing Template', 'Art Piece'],
    SelectedDocumentType:null,
    Themes:[],
    DataAsKVP:{},
    ShouldImageBeUploaded:false,
    ImagesToUpload:[],
    Success: true,
    Message: "",
    Open: false,
  }

  componentDidMount(){

  }
  /** The selected Document type is used to determine what eact upload form should be displayed.  */
  selectDocumentType = (value) => {
    this.setState({SelectedDocumentType: value})
  }
  UpdateThemes= (newThemes) => {
    this.setState({Themes: newThemes})
  }
  showImageInterface = (event) => {
    this.setState({ShouldImageBeUploaded: event.target.checked})
  }
  validator = (validationArray, id) => {
    let valid = true
    let contName = document.getElementById(id).value
    for(let x = 0 ; x < validationArray.length; x++)
    {
      if(validationArray[x] === "lower")
      {
        for(let y = 0 ; y < contName.length; y++ )
        {
          if(contName[y] == contName[y].toUpperCase())
          {
            valid = false; 
            return valid
          }
        }
      }
    }
  }/*Add O Auth, opIdConnect*/
  /*export function createBlobServiceWithSas(host: string|StorageHost, sasToken: string): BlobService;*/

  selectFile = (event) => {
    try{
      //console.log(event.target.files[0])
      const ending = this.determineFileEnding(event.target.files[0].name)
      if(ending === "pdf" ||  ending === "docx" || ending === "PDF" ||  ending === "DOCX")
      {
        this.setState({FileToUpload: event.target.files[0]})
      } else {
        this.setState({Message: "You Must Choose a .pdf or .docx file", Open:true})
      }
    }catch(err){
      console.log(err)
    }

  }
  selectImage=(event) => {
    try{
      const ending = this.determineFileEnding(event.target.files[0].name)
      if(ending === "jpg" || ending === "png" || ending === "JPG" || ending === "PNG")
      {
        let images = JSON.parse(JSON.stringify(this.state.ImagesToUpload));
        images.push(event.target.files[0]);
        this.setState({ImagesToUpload:images});
      } else {
        this.setState({Message: "You Must Choose a .jpg or .png file", Open:true})
      }
    }catch(err){
      console.log(err)
    }

  }
  uploadFile = () => {
    var bodyFormData = new FormData();
    bodyFormData.set('file',this.state.FileToUpload)
    for(let y = 0 ; y < this.state.ImagesToUpload.length; y++)
    {
      bodyFormData.set('file'+y +1, this.state.ImagesToUpload[y])
    }
    axios.post('/api/blobCreator/createNewBlob',bodyFormData,{
      headers:{
        'Content-Type': 'multipart/form-data; boundary=absdfabs',
        'Content-Disposition': 'form-data'
    }}).then(res => {
      this.setState({Message: "Upload Successful", Open:true})
    }).catch(err =>  this.setState({Message: "Upload Failed", Open:true}))
  }

  Close = () => {
    this.setState({Open:false})
  }

  poemDataChangeHandler = (event) => {
    var someData = JSON.parse(JSON.stringify(this.state.DataAsKVP))
    someData[event.target.dataset.input] = event.target.value
    this.setState({DataAsKVP:someData})
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  validatePostData = () => {
  /*if(sessionStorage.getItem('Themes') === null ||sessionStorage.getItem('Themes').length === 0 ){
      this.setState({Error: "Themes"})
      return false
  }*/
  switch(this.state.SelectedDocumentType){
    case 'Poem' :
      return ["name", "Author"]
    case 'Writing Template' : 
      return ["name", "Grade"]
    case  'Art Piece' : 
      return ["name"]
    default:
      return ""
  }
}

determineFileEnding = (document) => {
  if(document === "")
    return ""
  //console.log(document.substring(document.length -5).split('.')[1])
  return(document.substring(document.length -7).split('.')[1].toLowerCase())
}

  updateTemplate = (id) => {
    var someData = JSON.parse(JSON.stringify(this.state.DataAsKVP))
    someData["templateId"] = id
    this.setState({DataAsKVP:someData})
  }
  
  //Method used when uploading a file to a lesson plan
  postData = () => {

    let themesForTransfer = sessionStorage.getItem(this.state.SelectedDocumentType.replace(/\s/g, '')+'UploadThemes')
    var file=this.state.FileToUpload;

    if(file === null){
      return null
    }
    
    var bodyFormData = new FormData();
    bodyFormData.set('type', this.state.SelectedDocumentType)
    bodyFormData.set('theme', themesForTransfer)
    bodyFormData.set('file', file)
    
    for(let y = 0 ; y < this.state.ImagesToUpload.length; y++){
      bodyFormData.set('file'+y +1, this.state.ImagesToUpload[y])
    }

    for(let key in this.state.DataAsKVP){
      bodyFormData.set(key, this.state.DataAsKVP[key])
    }
    axios.post('/api/blobCreator/createNewBlob',bodyFormData,{
      headers:{
                    'Content-Type': 'multipart/form-data; boundary=absdfabs',
                    'Content-Disposition': 'form-data'
     }}).then(res => {
        console.log(res)
        if(res.data === null){
          this.setState({Loading: false, Error: true})
        }
        //Should only call this method if we are sending the data to the create lesson plan component. 
        if(this.props.addComponent)
          this.props.addComponent(res.data, this.state.DataAsKVP, this.state.SelectedDocumentType, this.state.ImagesToUpload );
        this.setState({...this.initialState})
        sessionStorage.removeItem("Themes")
    })
    this.setState({Loading: true})
  }
  CloseSnackbar = () => {
    this.setState({Success: false})
  }
  render() {
    const validation = this.validatePostData()
    const disabled = typeof(this.state.DataAsKVP[validation[0]]) === 'undefined' || this.state.DataAsKVP[validation[0]] === ""
    return(
    <UploadDumbContainer 
                        //Properties
                        loading={this.state.Loading}
                        themes={this.state.Themes} 
                        updateTheme={this.UpdateThemes}
                        documentTypes={this.state.DocumentTypes} 
                        fileToUpload={this.state.FileToUpload}
                        shouldImagesBeUploaded={this.state.ShouldImageBeUploaded}
                        uploadedImages={this.state.ImagesToUpload}
                        showImageInterface={this.showImageInterface}
                        success={this.state.Success}
                        disabled={disabled}
                        //Methods
                        selectDocumentFunction={this.selectDocumentType} 
                        selectedDocumentType={this.state.SelectedDocumentType}
                        selectFile={this.selectFile}
                        updateTheme={this.UpdateThemes}
                        poemDataChangeHandler={this.poemDataChangeHandler} 
                        postData={this.postData}
                        uploadImage={this.selectImage}
                        changeThemes={this.state.handleChange}
                        closeSnack={this.CloseSnackbar}
                        updateTemplate={this.updateTemplate}
                        //Props
                        addComponent={this.props.addComponent} 
                        message={this.state.Message}
                        open={this.state.Open}
                        close={this.Close}
                        
                        />
                        
                        
    );
  }
}
export default UploadFileSmartContainer
