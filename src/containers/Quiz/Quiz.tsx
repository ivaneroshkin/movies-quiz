import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

import { IQuiz } from '../../components/FinishedQuiz/FinishedQuiz';
import { IRootState } from '../../App';

interface QuizProps {
  match: IMatch;
  fetchQuizById: (id: string) => void;
  loading: boolean;
  isFinished: boolean;
  results: any;
  activeQuestion: number;
  title: string;
  answerState: null | object;
  quiz: IQuiz;
  quizAnswerClick: (answerId: number) => void;
  retryQuiz: () => void;
}

interface IMatch {
  isExact: boolean;
  params: IParam;
  path: string;
  url: string;
}

interface IParam {
  id: string;
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
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h2>
            {this.props.quiz === null ? 'Loading...' : this.props.quiz.title}
          </h2>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              onRetry={this.props.retryQuiz}
              quiz={this.props.quiz}
              results={this.props.results}
            />
          ) : (
            <ActiveQuiz
              question={
                this.props.quiz.quiz[this.props.activeQuestion].question
              }
              answers={this.props.quiz.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    fetchQuizById: (id: string) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId: number) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
