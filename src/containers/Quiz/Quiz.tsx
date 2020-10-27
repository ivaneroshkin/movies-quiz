import React, { Component } from 'react';
import classes from './Quiz.module.css';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

interface QuizProps {}

interface QuizState {
  results: any;
  isFinished: boolean;
  activeQuestion: number;
  quiz: Array<any>;
  answerState: null | object;
}

// interface ResultsObject {
//   [key: string]: string
// }

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
    results: {},
    isFinished: false,
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
    const results: any = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[this.state.activeQuestion]) {
        results[this.state.activeQuestion] = 'success';
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });

      // Checked next answer and styled AnswerItem component
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            answerState: null,
            activeQuestion: this.state.activeQuestion + 1,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[this.state.activeQuestion] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h2>Movies Quiz</h2>
          {this.state.isFinished ? (
            <FinishedQuiz
              onRetry={this.retryHandler}
              quiz={this.state.quiz}
              results={this.state.results}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
