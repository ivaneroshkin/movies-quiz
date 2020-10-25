import React, { Component } from 'react';
import classes from './Quiz.module.css';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

interface QuizProps {}

interface QuizState {
  activeQuestion: number;
  quiz: Array<any>;
  answerState: null | object;
}

// Todo: write interfate for state.quiz element
//
// interface QuestionObject {
//   id: number,
//   question: string,
//   rigthAnswer: number,
//   answers: any
// }

class Quiz extends Component<QuizProps, QuizState> {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question:
          'Which US President gives Kevin McAllister directions in Home Alone 2?',
        rightAnswerId: 3,
        answers: [
          { text: 'Bill Clinton', id: 1 },
          { text: 'Barack Obama', id: 2 },
          { text: 'Donald Trump', id: 3 },
          { text: 'George W. Bush', id: 4 },
        ],
      },
      {
        id: 2,
        question: 'Who directed Titanic, Avatar and The Terminator?',
        rightAnswerId: 1,
        answers: [
          { text: 'James Cameron', id: 1 },
          { text: 'Quentin Tarantino', id: 2 },
          { text: 'Guy Ritchie', id: 3 },
          { text: 'Stanley Kubrick', id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId: number) => {
    const question: any = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: 'success' },
      });

      // Checked next answer and styled AnswerItem component
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log('Finished');
        } else {
          this.setState({
            answerState: null,
            activeQuestion: this.state.activeQuestion + 1,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: 'error' },
      });
    }
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h2>Movies Quiz</h2>
          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            answerState={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
