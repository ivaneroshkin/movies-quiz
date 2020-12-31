import React from 'react';
import classes from './AnswerItem.module.css';

interface AnswerItemProps {
  state: number | null;
  answer: Answer;
  onAnswerClick: (answerId: number) => void;
}

export interface Answer {
  id: number;
  text: string;
}

const AnswerItem = (props: AnswerItemProps) => {
  const cls = [classes.AnswerItem];

  if (props.state) {
    cls.push(classes[props.state]);
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      <span>{props.answer.text}</span>
    </li>
  );
};

export default AnswerItem;
