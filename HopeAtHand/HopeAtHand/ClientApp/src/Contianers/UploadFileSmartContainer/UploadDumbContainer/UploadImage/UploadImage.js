import React from 'react'
import Filler from '../../../../components/HOC/Filler';
import { Button, TextField, Grid } from '@material-ui/core'

const uploadImage = (props) => {
    let uploadInterface, uploadDetails = <div></div>
    if(props.fileToUpload !== null){
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
        <Grid container>
            <Grid item xs={2}>
                <label style={{width: '100%'}} htmlFor="raised-button-file_img">
                    <Button fullWidth variant="contained" color={"primary"} component="span">Upload</Button>
                </label> 
            </Grid>
            <Grid item xs={3}>
                <input value={(props.uploadedImages.length === 0 ? "" : props.uploadedImages[props.uploadedImages.length -1].name)}></input>
            </Grid>
        </Grid></Filler>)
        } else {
            uploadInterface = <p>Nothing Is Being Uploaded</p>
        }
    } else { // if there is no initial upload for the file
        return <div></div>
    }

    return(
        <Filler>
            <label>Add Images<input type='checkbox' onChange={props.showImageInterface}></input></label>
            {uploadInterface}
            {uploadDetails}
        </Filler>
    )
}

export default uploadImage