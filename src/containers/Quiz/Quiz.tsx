import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import data from '../../data/data.json';
import { createQuiz } from '../../utils/quizFactory';

import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

interface QuizProps {
  match: any;
  fetchQuizById: any;
  loading: boolean;
  isFinished: boolean;
  results: any;
  activeQuestion: number;
  title: string;
  answerState: null | object;
  quiz: any;
  quizAnswerClick: any;
  retryQuiz: any;
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
  // state = {
  //   ...data.quizzes[this.props.match.params.id - 1],
  //   loading: true,
  // };

  // onAnswerClickHandler = (answerId: number) => {
  // const question: any = this.state.quiz[this.state.activeQuestion];
  // const results: any = this.state.results;

  // if (question.rightAnswerId === answerId) {
  //   if (!results[this.state.activeQuestion]) {
  //     results[this.state.activeQuestion] = 'success';
  //   }

  //   this.setState({
  //     answerState: { [answerId]: 'success' },
  //     results,
  //   });

  //   // Checked next answer and styled AnswerItem component
  //   const timeout = window.setTimeout(() => {
  //     if (this.isQuizFinished()) {
  //       this.setState({
  //         isFinished: true,
  //       });
  //     } else {
  //       this.setState({
  //         answerState: null,
  //         activeQuestion: this.state.activeQuestion + 1,
  //       });
  //     }
  //     window.clearTimeout(timeout);
  //   }, 1000);
  // } else {
  //   results[this.state.activeQuestion] = 'error';
  //   this.setState({
  //     answerState: { [answerId]: 'error' },
  //     results,
  //   });
  // }
  // };

  // isQuizFinished = () => {
  //   return this.state.activeQuestion + 1 === this.state.quiz.length;
  // };

  // retryHandler = () => {
  //   this.setState({
  //     results: {},
  //     isFinished: false,
  //     activeQuestion: 0,
  //     answerState: null,
  //   });
  // };

  componentDidMount() {
    console.log('componentDidMount', this.props);
    this.props.fetchQuizById(this.props.match.params.id);
    // console.log('Quiz ID =', this.props.match.params.id);

    // try {
    //   const response = await axios.get(
    //     `https://movies-quiz-555.firebaseio.com/quizzes/${this.props.match.params.id}.json`
    //   );
    //   const newQuizFromDB: QuizState = createQuiz(response.data);

    //   this.setState({
    //     ...newQuizFromDB,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    console.log('component render with props:', this.props);
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
              answerNumber={this.props.quiz.activeQuestion + 1}
              answerState={this.props.quiz.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchQuizById: (id: any) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId: any) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
