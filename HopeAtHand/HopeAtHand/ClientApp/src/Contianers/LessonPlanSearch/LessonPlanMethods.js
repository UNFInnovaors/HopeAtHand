import React, {Component} from 'react';
import PoemSearch from '../../components/PoemSearch/PoemSearch';
import Classes from './LessonPlan.css';
import Typography from '@material-ui/core/Typography';

/** Takes in the current sate of LessonPlan and returns the formatted HTML to display the Lesson Plan */
class  displayLessonPlan extends Component {


  render(){
  console.log('This is props ', this.props.LessonPlan);
  if (this.props.LessonPlan === '') {
    return <div></div>;
  } else {
    return (
      <div>
        <div>
          <Typography variant="h5">{this.props.LessonPlan.name}</Typography>
        </div>
        <div className={'flex'}>
          <div>
            <Typography variant="h5">Poem : {this.props.LessonPlan.poem.title}</Typography>
            <PoemSearch FindThePoem= {this.props.FindThePoem}/>
          </div>
          <br/>
          <div>
            <Typography variant="h5">Writing Assignment : {this.props.LessonPlan.writing.title}</Typography>
          </div>
          <br/>
           <br/>
          <div>
            <Typography variant="h5">Art Piece : {this.props.LessonPlan.artPiece.title}</Typography>
          </div>
          <br/>
        </div>
      </div>
    );
  }
}
}
/** This method takes in an array of lesson plans and returns them mapped into JSX for the LessonPlanRenderMethod */
export default displayLessonPlan;
