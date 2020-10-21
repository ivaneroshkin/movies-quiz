import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from '../AnswerItem/AnswerItem'

interface AnswersListProps {
  answers: Array<any>,
  onAnswerClick: any
}

const AnswersList = (props: AnswersListProps) => (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem 
            key={index}
            answer={answer}
            onAnswerClick={props.onAnswerClick}
          />
        )
      })}
    </ul>
)

export default AnswersList
