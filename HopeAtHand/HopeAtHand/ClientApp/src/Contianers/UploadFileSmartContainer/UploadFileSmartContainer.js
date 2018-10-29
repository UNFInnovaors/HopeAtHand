import React, { Component } from 'react'
import Select from 'react-select';
import axios from 'axios'
import 'azure-storage'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


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
    BlobService:null
  }

  componentDidMount(){
    if(this.state.BlobService === null )
    {
      var azure=require('azure-storage');
      var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=htmljs;AccountKey=hp6IODplmlb1asWA/VUmHFpxfEwneb5eJWlbYuI99APRhmatAfFosx0+eOClrBJi+aEqfOjPw53QK33bIlz4Gw==;EndpointSuffix=core.windows.net")
      this.setState({BlobService: blobService});
    }
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
      if (!error) {
        // if result = true, container was created.
        // if result = false, container already existed.
        }
      }); 
    }
  }

  selectFile = (event) => {
    console.log(event.target.files[0])
    this.setState({FileToUpload: event.target.files[0]})
  }
  uploadFile = () => {
    var azure=require('azure-storage');
    var location=require('path');
    console.log(this.state.FileToUpload)
    var file=this.state.FileToUpload;
    var bodyFormData = new FormData();
    bodyFormData.set('file',this.state.FileToUpload)
    //var blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=htmljs;AccountKey=hp6IODplmlb1asWA/VUmHFpxfEwneb5eJWlbYuI99APRhmatAfFosx0+eOClrBJi+aEqfOjPw53QK33bIlz4Gw==;EndpointSuffix=core.windows.net")
    /*blobService.createBlockBlobFromLocalFile('firstcontainer', 'CodeSnippits.txt', '../../../../../../../../Desktop/CodeSnippits.txt', (error, result) => {
        if(error) {
            console.log(error)
        } else {
            console.log('Upload is successful');
        }
    });*/
    axios.post('https://localhost:5001/api/blobCreator/createNewBlob',bodyFormData,{
      headers:{
        'Content-Type': 'multipart/form-data; boundary=absdfabs',
        'Content-Disposition': 'form-data'
    }}).then(res => {
      console.log(res)
    })

  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
    const account = {
      name: "htmljs",
      sas:  "se=2040-12-12&sp=rwdlac&sv=2018-03-28&ss=b&srt=sco&sig=kof64cpIlp9%2BVwnJxOKhRJbixLKu0mbria10AbNvZuM%3D"
    };
    const blobUri = 'https://' +account.name + '.blob.core.windows.net';
    var azure = require('azure-storage')
    /* global AzureStorage */
    const blobService = azure.createBlobServiceWithSas(blobUri, account.sas);


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
      </div>
    );
  }
}
export default UploadFileSmartContainer