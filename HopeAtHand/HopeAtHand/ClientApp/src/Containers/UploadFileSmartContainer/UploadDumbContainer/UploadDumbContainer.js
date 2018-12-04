import React from 'react';
import Poem from './UploadPoem/UploadPoem';
import Writing from './UploadWritingTemplate/UploadWritingAssignment';
import Art from './ArtPiece/UploadArtPiece';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ReusableSelect from '../../../components/UI Components/ReuseableSelect';
import ThemeSelect from '../../../components/UI/ThemeSelect/ThemeSelect';
import ThemeBox from '../../../components/UI/ThemeBox/ThemeBox'
import Filler from '../../../components/HOC/Filler';
import UploadImage from './UploadImage/UploadImage';

const uploadDocumentDumbContainer = (props) => {
    console.log('this is the dubiesProps', props);
    let uploadComponent=<div></div>
    switch(props.selectedDocumentType)
    {
        case null:
            uploadComponent=<div></div>
        break;
        case 'Poem':
            uploadComponent=<Poem postData={props.postData} selectFile={props.selectFile} fileToUpload={props.fileToUpload} updateTheme={props.updateTheme} poemDataChangeHandler={props.poemDataChangeHandler}></Poem>
        break;
        case 'Writing Template':
            uploadComponent=<Writing></Writing>
        break;
        case 'Art Piece':
            uploadComponent=<Art></Art>
        break;
        default:
            uploadComponent=<p>Error {props.selectedDocumentType}</p>
        break;
    }
    return(
        <Grid container item spacing={24}>
        <Grid item xs={12}><Typography variant="h2" align="center">Upload</Typography></Grid>
        <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <ReusableSelect 
                    label="Choose A Document Type To Upload"
                    changeStateOfOptions={props.selectDocumentFunction} 
                    value={props.selectedDocumentType} 
                    valuesForOptions={props.documentTypes} >
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
                                                selectedDocumentType = {props.selectedDocumentType}></UploadImage></Grid>

            </Grid>
            {( props.selectedDocumentType !== null ?
            <Filler>
            <Grid container item xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} style={{marginTop:'1.25%'}}><ThemeSelect updateThemes={props.updateTheme}/></Grid><Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid><Grid style={{marginTop:'2.5%'}} item xs={10}><ThemeBox themes={props.themes}/></Grid><Grid item xs={1}></Grid>
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
    );
}
export default uploadDocumentDumbContainer