import React, { Component } from 'react';
import axios from 'axios';
import classes from './Quiz.module.css';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import data from '../../data/data.json';
import { createQuiz } from '../../utils/quizFactory';

interface QuizProps {
  match: any;
}

interface QuizState {
  loading: boolean;
  title: string;
  results: any;
  isFinished: boolean;
  activeQuestion: number;
  quiz: Array<Question>;
  answerState: null | object;
}

interface Question {
  question: string;
  id: number;
  rightAnswerId: number;
  answers: Array<Answer>;
}
interface Answer {
  id: number;
  text: string;
}

class Quiz extends Component<QuizProps, QuizState> {
  state = {
    ...data.quizzes[this.props.match.params.id - 1],
    loading: true,
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

  async componentDidMount() {
    console.log('Quiz ID =', this.props.match.params.id);

    try {
      const response = await axios.get(
        `https://movies-quiz-555.firebaseio.com/quizzes/${this.props.match.params.id}.json`
      );
      const newQuizFromDB: QuizState = createQuiz(response.data);

      this.setState({
        ...newQuizFromDB,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h2>{this.state.title}</h2>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
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
