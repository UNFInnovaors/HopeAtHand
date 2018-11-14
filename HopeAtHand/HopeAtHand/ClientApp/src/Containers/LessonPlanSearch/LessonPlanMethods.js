import React, {Component} from 'react';
import PoemSearch from '../../components/PoemSearch/PoemSearch';
import Classes from './LessonPlan.css';

/** Takes in the current sate of LessonPlan and returns the formatted HTML to display the Lesson Plan */
class  displayLessonPlan extends Component {
  render(){
  console.log('This is props ', this.props.LessonPlan);
  if (this.props.LessonPlan === '') {
    return <div> </div>;
  } else {
    return (
      <div>
        <div>
          <h3>{this.props.LessonPlan.name}</h3>
        </div>
        <div className={'flex'}>
          <div>
            <h3>Poem : {this.props.LessonPlan.poem.title}</h3>
            <PoemSearch FindThePoem= {this.props.FindThePoem}/>
          </div>
          <div>
            <h3>Writing Assignment : {this.props.LessonPlan.writing.title}</h3>
          </div>
          <div>
            <h3>Art Piece : {this.props.LessonPlan.artPiece.title}</h3>
          </div>
        </div>
      </div>
    );
  }
}
}
/** This method takes in an array of lesson plans and returns them mapped into JSX for the LessonPlanRenderMethod */
export default displayLessonPlan;
