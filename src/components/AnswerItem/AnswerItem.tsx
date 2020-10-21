import React from 'react'
import classes from './AnswerItem.module.css'

interface AnswerItemProps {
  answer: any,
  onAnswerClick: any
}

const AnswerItem = (props: AnswerItemProps) => {
  return (
    <li
      className={classes.AnswerItem}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  )
}

export default AnswerItem
