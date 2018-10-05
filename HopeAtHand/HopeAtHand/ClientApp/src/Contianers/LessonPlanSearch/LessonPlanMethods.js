import React from 'react';
import PoemSearch from '../../components/PoemSearch/PoemSearch';
import WrittingAssignmentSearch from '../../components/WritingAssignment/WritingAssignment';
import Classes from './LessonPlan.css';

/** Takes in the current sate of LessonPlan and returns the formatted HTML to display the Lesson Plan */
const displayLessonPlan = LessonPlan => {
  console.log(LessonPlan);
  if (LessonPlan === '') {
    return <div />;
  } else {
    return (
      <div>
        <div>
          <h3>{LessonPlan.name}</h3>
        </div>
        <div className={'flex'}>
          <div>
            <h3>Poem : {LessonPlan.poem.title}</h3>
            <PoemSearch />            
          </div>
          <div>
            <h3>Writing Assignment : {LessonPlan.writing.title}</h3>
            <WrittingAssignmentSearch />
          </div>
          <div>
            <h3>Art Piece : {LessonPlan.artPiece.title}</h3>
          </div>
        </div>
      </div>
    );
  }
};
/** This method takes in an array of lesson plans and returns them mapped into JSX for the LessonPlanRenderMethod */
const showFoundLessons = lessonPlans => {
  if (lessonPlans.length === 0) {
    return <p>No Results Where Located</p>;
  } else {
    return 'contentToReturn';
  }
};
export { showFoundLessons, displayLessonPlan };
