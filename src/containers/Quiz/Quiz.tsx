import React, { Component } from 'react'
import classes from "./Quiz.module.css"

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

interface QuizProps {

}

interface QuizState {
  quiz: Array<object>
}

class Quiz extends Component<QuizProps, QuizState> {
  state = {
    quiz: [
      {
        question: 'Which US President gives Kevin McAllister directions in Home Alone 2?',
        rightAnswerId: 3,
        answers: [
          {text: 'Bill Clinton', id: 1},
          {text: 'Barack Obama', id: 2},
          {text: 'Donald Trump', id: 3},
          {text: 'George W. Bush', id: 4},
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId:number) => {
    console.log('Answer Id', answerId);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
        <h2>Movies Quiz</h2>
          <ActiveQuiz
            question={this.state.quiz[0].question}
            answers={this.state.quiz[0].answers}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Quiz
