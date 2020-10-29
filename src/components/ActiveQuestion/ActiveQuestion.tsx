import React from 'react';
import classes from './ActiveQuestion.module.css';

interface ActiveQuestionProps {
  question: string;
}

const ActiveQuestion = (props: ActiveQuestionProps) => {
  return <span className={classes.ActiveQuestion}>«{props.question}»</span>;
};

export default ActiveQuestion;
