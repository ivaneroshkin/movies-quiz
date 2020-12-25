import axios from 'axios';
import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

import { createQuiz } from '../../utils/quizFactory';
import data from '../../data/data.json';

interface Link {
  id: number | string;
  theme: string;
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

export function fetchQuizzes() {
  return async (dispatch: any) => {
    dispatch(fetchQuizzesStart());

    try {
      const quizzes: Array<Link> = [];
      const response = await axios.get(
        'https://movies-quiz-555.firebaseio.com/quizzes.json'
      );

      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          theme: `Test quiz ${index + 1}`,
        });
      });
      dispatch(fetchQuizzesSuccess(quizzes));
    } catch (error) {
      dispatch(fetchQuizzesError(error));
    }
  };
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START,
  };
}

export function fetchQuizzesSuccess(quizzes: any) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    quizzes,
  };
}

export function fetchQuizzesError(error: any) {
  return {
    type: FETCH_QUIZZES_ERROR,
    error,
  };
}

export function fetchQuizById(quizId: any) {
  return async (dispatch: any) => {
    dispatch(fetchQuizzesStart());

    console.log('Quiz ID =', quizId);

    // TODO: repair this hotfix
    if (quizId > 0 && quizId < 4) {
      const localQuiz = { ...data.quizzes[quizId - 1] };
      dispatch(fetchQuizSuccess(localQuiz));
    } else {
      try {
        const response = await axios.get(
          `https://movies-quiz-555.firebaseio.com/quizzes/${quizId}.json`
        );
        const newQuizFromDB: QuizState = createQuiz(response.data);
        dispatch(fetchQuizSuccess(newQuizFromDB));
      } catch (error) {
        console.log(error);
        dispatch(fetchQuizzesError(error));
      }
    }
  };
}

export function fetchQuizSuccess(quiz: any) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function quizAnswerClick(answerId: any) {
  return (dispatch: any, getState: any) => {
    // from thunk
    const state = getState().quiz;

    console.log('new state', state);
    const question: any = state.quiz.quiz[state.activeQuestion];
    const results: any = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[state.activeQuestion]) {
        results[state.activeQuestion] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results));

      // Checked next answer and styled AnswerItem component
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[state.activeQuestion] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }
  };
}

export function quizSetState(answerState: object, results: object) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number: number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function isQuizFinished(state: any) {
  return state.activeQuestion + 1 === state.quiz.quiz.length;
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}
