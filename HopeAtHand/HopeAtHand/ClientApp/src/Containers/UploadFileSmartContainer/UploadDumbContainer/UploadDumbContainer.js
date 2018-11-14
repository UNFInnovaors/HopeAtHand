import React from 'react'
import Poem from './UploadPoem/UploadPoem'
import Writing from './UploadWritingTemplate/UploadWritingAssignment'
import Art from './ArtPiece/UploadArtPiece'
import { Grid } from '@material-ui/core'

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
        <Filler>
            <Grid container spacing={24}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <select onChange={props.selectDocumentFunction} value={props.selectedDocumentType}>
                        <option value={null} disabled selected>Select The Document Type To Upload</option>
                        {props.documentTypes.map((doc,index) => {
                            return <option key={index} value={doc}>{doc}</option>
                        })}
                    </select>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1}></Grid>   
                <Grid item xs={10}>{uploadComponent}</Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1}></Grid>   
                <Grid item xs={10}><UploadImage fileToUpload={props.fileToUpload} 
                                                shouldImagesBeUploaded={props.shouldImagesBeUploaded}
                                                uploadImage={props.uploadImage}
                                                uploadedImages={props.uploadedImages}
                                                showImageInterface={props.showImageInterface}></UploadImage></Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </Filler>
    );
}

export default uploadDocumentDumbContainer