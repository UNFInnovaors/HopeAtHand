import React from 'react'
import Filler from '../../../../components/HOC/Filler';
import { Button, TextField, Grid, Typography, Checkbox, Paper } from '@material-ui/core'

const uploadImage = (props) => {
    let uploadInterface, uploadDetails, uploadFile = <div></div>
    if(props.selectedDocumentType !== null)
    {
        uploadFile = (
            <Filler>

               
                <Typography variant='h2' style={{marginLeft: '0px', paddingLeft: '0px', marginBottom:'18px'}}>Upload File</Typography>
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <label style={{width: '100%'}} htmlFor="raised-button-file">
                            <Button fullWidth variant="contained" color={"primary"} component="span">Upload</Button>
                        </label> 
                    </Grid>
                    <Grid item xs={3}>
                        <TextField disabled fullWidth  value={(props.fileToUpload === null ? ("Please choose a "+props.selectedDocumentType) : props.fileToUpload.name)}></TextField>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='title'>Add Image : <Checkbox   onChange={props.showImageInterface}></Checkbox></Typography>
                    </Grid>
                </Grid>
                <input onChange={props.selectFile}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                />
            </Filler>
            )
    
    if(props.shouldImagesBeUploaded === true){
        uploadDetails = props.uploadedImages.map( image => {
            return <p>{image.name}</p>
        })
        uploadInterface = (<Filler><input onChange={props.uploadImage}
        style={{ display: 'none' }}
        id="raised-button-file_img"
        multiple
        type="file"
    />
    
    {(props.selectedDocumentType === null ?  "" :<Typography variant="h4" style={{marginBottom:'18px'}}>Upload Image</Typography>)}
    <Grid container spacing={24}>
        <Grid item xs={2}>
            <label style={{width:'100%'}} htmlFor="raised-button-file_img">
                <Button fullWidth variant="contained" color={"primary"} component="span">Upload</Button>
            </label> 
        </Grid>
        <Grid item xs={3}>
            <TextField fullWidth disabled  value={(props.uploadedImages.length === 0 ? "Please Choose an Image" : props.uploadedImages[props.uploadedImages.length -1].name)}></TextField>
        </Grid>
    </Grid></Filler>)
    } else {
        uploadInterface = <Typography>No image of the document will currently be uploaded</Typography>
    }
}
    
    return(
        <Filler>
       <Grid container>
            {uploadFile}
            {uploadInterface}
            {uploadDetails}
        </Grid>
        
        </Filler>
    )
}

export default uploadImage

/* <Paper style={(props.selectedDocumentType !== null ?{padding:'16px'} : {display:'None'} )}></Paper>
*/