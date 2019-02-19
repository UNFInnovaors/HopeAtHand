import React, { Component } from 'react'
import Select from 'react-select';
import Filler from '../../components/HOC/Filler'
import axios from 'axios'
import 'azure-storage'
import UploadDumbContainer from './UploadDumbContainer/UploadDumbContainer'
import { BlobService } from 'azure-storage';

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

  }

  initialState= {
    selectedOption: null,
    Loading: false,
    account : {
      name: "htmljs",
      sas:  "se=2040-12-12&sp=rwdlac&sv=2018-03-28&ss=b&srt=sco&sig=kof64cpIlp9%2BVwnJxOKhRJbixLKu0mbria10AbNvZuM%3D"
    },
    blobUri : 'https://htmljs.blob.core.windows.net',
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
    Success: true
  }

  componentDidMount(){
    /**if(this.state.BlobService === null )
    {
      var azure=require('azure-storage');
      var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=htmljs;AccountKey=hp6IODplmlb1asWA/VUmHFpxfEwneb5eJWlbYuI99APRhmatAfFosx0+eOClrBJi+aEqfOjPw53QK33bIlz4Gw==;EndpointSuffix=core.windows.net")
      this.setState({BlobService: blobService});
    }*/
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
  createContainer = () => {
    let valid = true
    valid = this.validator(this.state.containerName["validation"],this.state.containerName["id"])
    if(valid !== false){
    var azure=require('azure-storage');
    var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=htmljs;AccountKey=hp6IODplmlb1asWA/VUmHFpxfEwneb5eJWlbYuI99APRhmatAfFosx0+eOClrBJi+aEqfOjPw53QK33bIlz4Gw==;EndpointSuffix=core.windows.net")
    blobService.createContainerIfNotExists(document.getElementById("Container").value, {
      publicAccessLevel: 'blob'
    }, 
      function(error, result, response) {
      if (!error) {// if result = true, container was created.if result = false, container already existed.
      }}); 
    }
  }

  selectFile = (event) => {
    this.setState({FileToUpload: event.target.files[0]})
    //axios.get('https://htmljs.blob.core.windows.net/images/Itinerary.docx').then(res => console.log(res))
    //this.listFile();
  }
  selectImage=(event) => {
    let images = JSON.parse(JSON.stringify(this.state.ImagesToUpload));
    images.push(event.target.files[0]);
    this.setState({ImagesToUpload:images});
  }
  uploadFile = () => {
    var azure=require('azure-storage');
    var location=require('path');
    var file=this.state.FileToUpload;
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
    })
  }
  listFile = () => {
    var urls = axios.get('/api/blobCreator/CreateList').then(res => {
                                                                                             this.setState({Images:res.data})})    
  }
  poemDataChangeHandler = (event) => {
    var someData = JSON.parse(JSON.stringify(this.state.DataAsKVP))
    console.log(event.target.dataset.input)
    someData[event.target.dataset.input] = event.target.value
    this.setState({DataAsKVP:someData})
    console.log(this.state.DataAsKVP)
    /*switch(event.target.dataset){
      case('1'):
        //
      break;
      case('2'):
        //
      break;
      case('3'):
        //
      break;
    }*/
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  validatePostData = () => {
  if(sessionStorage.getItem('Themes') === null ||sessionStorage.getItem('Themes').length === 0 ){
      this.setState({Error: "Themes"})
      return false
  }
  let validationArray; 
  switch(this.state.SelectedDocumentType){
    case 'Poem' :
      validationArray = ["Name", "Author"]
      break;
    case 'Writing Template' : 
      validationArray = ["Name", "Grade"]
      break;
    case  'Art Piece' : 
      validationArray = ["Name", "Supplies"]
      break;
  }
}
  
  //Method used when uploading a file to a lesson plan
  postData = () => {
   /*if(!this.validatePostData())
      return*/

    let themesForTransfer = sessionStorage.getItem(this.state.SelectedDocumentType.replace(/\s/g, '')+'UploadThemes')
    var file=this.state.FileToUpload;
    
    var bodyFormData = new FormData();
    bodyFormData.set('type', this.state.SelectedDocumentType)
    bodyFormData.set('theme', themesForTransfer)
    bodyFormData.set('file', file)
    
    for(let y = 0 ; y < this.state.ImagesToUpload.length; y++){
      bodyFormData.set('file'+y +1, this.state.ImagesToUpload[y])
    }

    for(let key in this.state.DataAsKVP){
      bodyFormData.set(key, this.state.DataAsKVP[key])
      console.log(this.state.DataAsKVP[key], key, 'foreach doc')
    }
    console.log(bodyFormData)
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
                        //Methods
                        selectDocumentFunction={this.selectDocumentType} 
                        selectedDocumentType={this.state.SelectedDocumentType}
                        selectFile={this.selectFile}
                        updateTheme={this.UpdateThemes}
                        poemDataChangeHandler={this.poemDataChangeHandler} 
                        postData={this.postData}
                        uploadImage={this.selectImage}
                        changeThemes={this.state.handleChange}
                        close={this.CloseSnackbar}
                        //Props
                        addComponent={this.props.addComponent} />
                        
    );
  }
}
export default UploadFileSmartContainer

/**  const { selectedOption } = this.state;
    const account = {
      name: "htmljs",
      sas:  "se=2040-12-12&sp=rwdlac&sv=2018-03-28&ss=b&srt=sco&sig=kof64cpIlp9%2BVwnJxOKhRJbixLKu0mbria10AbNvZuM%3D"
    };
    const blobUri = 'https://' +account.name + '.blob.core.windows.net';
    var azure = require('azure-storage')
    /* global AzureStorage */
   /* const blobService = azure.createBlobServiceWithSas(blobUri, account.sas);
    let images = <div></div>
    if(this.state.Images !== null)
    {
      images = this.state.Images.map((ima,index) => {
        return(<div><a href={ima}><img height={200} width={200} src={ima} alt={index} ></img></a><br></br></div>)
      })
    }

    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          isMulti={true}
        />
        
        
        <input type={this.state.containerName["type"]} disabled={this.state.containerName["disabled"]} required={this.state.containerName["required"]}  placeholder={this.state.containerName["placeHolder"]}></input>
        
        
        <button id="create-button" onClick={this.createContainer}>Create Container</button>

        <input type="file" id="fileinput" onChange={this.selectFile} />
        <button id="upload-button" onClick={this.uploadFile}>Upload</button>

        <button id="list-button">List</button>

        <button id="delete-button">Delete</button>
        <br></br>
        {images}
      </div>
    );
    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


    /*var file1 = document.getElementById('fileinput').files[0]
    console.log('This is have the file turned out', file1, file1.name, typeof(file1))
    var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=htmljs;AccountKey=hp6IODplmlb1asWA/VUmHFpxfEwneb5eJWlbYuI99APRhmatAfFosx0+eOClrBJi+aEqfOjPw53QK33bIlz4Gw==;EndpointSuffix=core.windows.net")
    console.log(blobService, typeof(blobService))
    blobService.createBlockBlobFromBrowserFile('firstcontainer',file1.name,file1, (error, result) => {
      if(error) {
          console.log(error)
      } else {
          console.log('Upload is successful');
      }})*/
  
    
    /*blobService.createBlockBlobFromLocalFile('firstcontainer', 'CodeSnippits.txt', '../../../../../../../../Desktop/CodeSnippits.txt', (error, result) => {
        if(error) {
            console.log(error)
        } else {
            console.log('Upload is successful');
        }
    });*/