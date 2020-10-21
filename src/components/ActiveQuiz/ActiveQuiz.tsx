import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from '../AnswersList/AnswersList'

interface ActiveQuizProps {
  question: string,
  answers: Array<any>,
  onAnswerClick: any // TODO: Fix type
}

const ActiveQuiz = (props: ActiveQuizProps) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          {/* TODO: Generate single question block */}
          <strong>1.</strong>&nbsp;
          {props.question}
        </span>

        <small>1/12</small>
      </p>

      <AnswersList 
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  );
}

export default ActiveQuiz

