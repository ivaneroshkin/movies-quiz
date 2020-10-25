import React from 'react';
import classes from './AnswerItem.module.css';

interface AnswerItemProps {
  state: number | null;
  answer: any;
  onAnswerClick: any;
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
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
