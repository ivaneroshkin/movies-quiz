import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from '../AnswersList/AnswersList';

interface ActiveQuizProps {
  question: string;
  answers: Array<any>;
  answerNumber: number;
  quizLength: number;
  answerState: null | object;
  onAnswerClick: any; // TODO: Fix type
}

const ActiveQuiz = (props: ActiveQuizProps) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          {/* TODO: Generate single question block */}
          <strong>{props.answerNumber}</strong>&nbsp;
          {props.question}
        </span>

        <small>
          {props.answerNumber}/{props.quizLength}
        </small>
      </p>

      <AnswersList
        state={props.answerState}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  );
};

export default ActiveQuiz;
