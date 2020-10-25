import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from '../AnswerItem/AnswerItem';

interface AnswersListProps {
  state: null | any;
  answers: Array<any>;
  onAnswerClick: any;
}

const AnswersList = (props: AnswersListProps) => (
  <ul className={classes.AnswersList}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          state={props.state ? props.state[answer.id] : null}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
          key={index}
        />
      );
    })}
  </ul>
);

export default AnswersList;
