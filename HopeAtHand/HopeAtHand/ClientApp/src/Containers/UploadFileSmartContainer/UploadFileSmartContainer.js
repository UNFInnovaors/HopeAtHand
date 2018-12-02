import React, { Component } from 'react'
import Select from 'react-select';
import Filler from '../../components/HOC/Filler'
import axios from 'axios'
import 'azure-storage'
import UploadDumbContainer from './UploadDumbContainer/UploadDumbContainer'
import { BlobService } from 'azure-storage';

class UploadFileSmartContainer extends React.Component {
  state = {
    selectedOption: null,
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
    Themes:null,
    DataAsKVP:{},
    ShouldImageBeUploaded:false,
    ImagesToUpload:[],

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
  UpdateThemes=(newThemes)=> {
    this.setState({Themes:newThemes})
  }
  showImageInterface = (event) => {
    this.setState({ShouldImageBeUploaded: event.target.checked})
  }
  validator = (validationArray, id) => {
    console.log(validationArray, id)
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
  }

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
    console.log(event.target.files[0])
    this.setState({FileToUpload: event.target.files[0]})
    //axios.get('https://htmljs.blob.core.windows.net/images/Itinerary.docx').then(res => console.log(res))
    //this.listFile();
  }
  selectImage=(event) => {
    let images = JSON.parse(JSON.stringify(this.state.ImagesToUpload));
    images.push(event.target.files[0]);
    console.log(images)
    this.setState({ImagesToUpload:images});
  }
  uploadFile = () => {
    var azure=require('azure-storage');
    var location=require('path');
    console.log(this.state.FileToUpload)
    var file=this.state.FileToUpload;
    var bodyFormData = new FormData();
    bodyFormData.set('file',this.state.FileToUpload)
    for(let y = 0 ; y < this.state.ImagesToUpload.length; y++)
    {
      bodyFormData.set('file'+y +1, this.state.ImagesToUpload[y])
    }
    axios.post('https://localhost:44365/api/blobCreator/createNewBlob',bodyFormData,{
      headers:{
        'Content-Type': 'multipart/form-data; boundary=absdfabs',
        'Content-Disposition': 'form-data'
    }}).then(res => {
      console.log(res)
    })
  }
  listFile = () => {
    var urls = axios.get('https://localhost:44365/api/blobCreator/CreateList').then(res => {console.log(res);
                                                                                             this.setState({Images:res.data})})    
  }
  poemDataChangeHandler = (event) => {
    console.log(event.target)
    console.log(typeof(event.target.dataset.input))
    var someData = JSON.parse(JSON.stringify(this.state.DataAsKVP))
    someData[event.target.dataset.input] = event.target.value
    console.log(someData)
    this.setState({DataAsKVP:someData})
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
    console.log(`Option selected:`, selectedOption);
  }
  postData = () => {
    console.log('this is state' , this.state)
    let DTO = {
      values: this.state.DataAsKVP,
    }
    var file=this.state.FileToUpload;
    var bodyFormData = new FormData();
    for(let key in this.state.DataAsKVP)
    {
      bodyFormData.set(key, this.state.DataAsKVP[key])
    }
    let themesForTransfer = ''
    for(let x = 0 ;x < this.state.Themes.length; x++)
    {
      if(x !== this.state.Themes.length -1)
      {
        themesForTransfer += this.state.Themes[x].themeId + ','
      }
      else
      {
        themesForTransfer += this.state.Themes[x].themeId
      }
      console.log(themesForTransfer)
    }
    bodyFormData.set('theme', themesForTransfer)
    bodyFormData.set('file', file)
    for(let y = 0 ; y < this.state.ImagesToUpload.length; y++){
      bodyFormData.set('file'+y +1, this.state.ImagesToUpload[y])
    }
    axios.post('https://localhost:44365/api/blobCreator/createNewBlob',bodyFormData,{
      headers:{
        'Content-Type': 'multipart/form-data; boundary=absdfabs',
        'Content-Disposition': 'form-data'
    }}).then(res => {
      console.log(res)
    })
  }
  render() {
    console.log('this is theme in the smart conntainner', this.state)
    return(
    <UploadDumbContainer documentTypes={this.state.DocumentTypes} 
                        selectDocumentFunction={this.selectDocumentType} 
                        selectedDocumentType={this.state.SelectedDocumentType}
                        selectFile={this.selectFile}
                        fileToUpload={this.state.FileToUpload}
                        updateTheme={this.UpdateThemes}
                        poemDataChangeHandler={this.poemDataChangeHandler} 
                        postData={this.postData}
                        shouldImagesBeUploaded={this.state.ShouldImageBeUploaded}
                        uploadImage={this.selectImage}
                        uploadedImages={this.state.ImagesToUpload}
                        showImageInterface={this.showImageInterface} />
                        
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