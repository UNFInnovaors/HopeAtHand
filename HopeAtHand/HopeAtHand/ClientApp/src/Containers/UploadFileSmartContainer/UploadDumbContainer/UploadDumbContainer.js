import React from 'react';
import Poem from './UploadPoem/UploadPoem';
import Writing from './UploadWritingTemplate/UploadWritingAssignment';
import Art from './ArtPiece/UploadArtPiece';
import { Grid, Paper, Typography, Button, CircularProgress, Snackbar } from '@material-ui/core';
import ReusableSelect from '../../../components/UI Components/ReuseableSelect';
import ThemeSelect from '../../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
import Filler from '../../../components/HOC/Filler';
import UploadImage from './UploadImage/UploadImage';

const uploadDocumentDumbContainer = (props) => {
    let uploadComponent=<div></div>
    switch(props.selectedDocumentType)
    {
        case null:
            uploadComponent=<div></div>
        break;
        case 'Poem':
            uploadComponent=
                <Poem 
                    postData={props.postData} 
                    selectFile={props.selectFile} 
                    fileToUpload={props.fileToUpload} 
                    updateTheme={props.updateTheme} 
                    poemDataChangeHandler={props.poemDataChangeHandler}>
                </Poem>
        break;
        case 'Writing Template':
            uploadComponent=<Writing
                        postData={props.postData} 
                        selectFile={props.selectFile} 
                        fileToUpload={props.fileToUpload} 
                        updateTheme={props.updateTheme} 
                        poemDataChangeHandler={props.poemDataChangeHandler}>
                        </Writing>
        break;
        case 'Art Piece':
            uploadComponent=<Art 
                    postData={props.postData} 
                    selectFile={props.selectFile} 
                    fileToUpload={props.fileToUpload} 
                    updateTheme={props.updateTheme} 
                    poemDataChangeHandler={props.poemDataChangeHandler}>
                    </Art>
        break;
        default:
            uploadComponent=<p>Error {props.selectedDocumentType}</p>
        break;
    }
    if(props.loading)
    {
        return(
            <Grid container item spacing={24}>
                <Grid item xs={12}><Typography variant="h2" align="center">Upload</Typography></Grid>
                <Grid style={{marginTop:'2.5%'}} item xs={12}><Typography align='center'>Loading</Typography></Grid>
                <Typography variant='body1' align='center'><CircularProgress style={{textAlign:'center'}}/></Typography>
            </Grid>
        )
    }
    return(
        <Filler>
            <Snackbar message="Upload Successful"
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={props.success === true}
            autoHideDuration={6000}
            onClose={props.close}
        >
        </Snackbar>
        <Grid container item spacing={24}>
        <Grid item xs={12}><Typography variant="h2" align="center">Upload Document</Typography></Grid>
        
        <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <ReusableSelect 
                    label="Choose A Document Type To Upload"
                    changeStateOfOptions={props.selectDocumentFunction} 
                    value={props.selectedDocumentType} 
                    valuesForOptions={props.documentTypes}
                     >
                </ReusableSelect>
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid container item xs={7}>
                <Grid item xs={1}></Grid>   
                <Grid item xs={11}>{uploadComponent}</Grid>
            </Grid>
            <Grid container item xs={5}>
                <Grid item xs={1}></Grid>   
                <Grid item xs={11}><UploadImage fileToUpload={props.fileToUpload} 
                                                shouldImagesBeUploaded={props.shouldImagesBeUploaded}
                                                uploadImage={props.uploadImage}
                                                uploadedImages={props.uploadedImages}
                                                showImageInterface={props.showImageInterface}
                                                selectedDocumentType = {props.selectedDocumentType}
                                                selectFile = {props.selectFile}
                                    ></UploadImage></Grid>

            </Grid>
            {( props.selectedDocumentType !== null ?
            <Filler>
            <Grid container item xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} style={{marginTop:'1.25%'}}><ThemeSelect destination={props.selectedDocumentType.replace(/\s/g, '')+"UploadThemes"} forUpload={true}/></Grid><Grid item xs={1}></Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            
            <Grid container item xs={12} spacing={24}>
                <Grid xs={4}></Grid>
                    <Grid item xs={4}>
                        <Button color="secondary" fullWidth variant="contained" onClick={props.postData}>Upload Document</Button>
                    </Grid>
                <Grid xs={4}></Grid>
            </Grid></Filler> : "")}
            </Grid>
        </Filler>
    );
}
export default uploadDocumentDumbContainer