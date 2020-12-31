import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from '../actions/actionTypes';

import { IQuiz } from '../../components/FinishedQuiz/FinishedQuiz';

const initialState = {
  loading: false,
  quizzes: [],
  linksList: [
    { id: 1, theme: 'Movies vol.1' },
    { id: 2, theme: 'Movies vol.2' },
    { id: 3, theme: 'Star wars' },
  ],
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

interface IAction {
  type: string;
  quiz?: IQuiz;
  quizzes?: Array<IQuizFromDB>;
  error?: any;
  results?: object;
  number?: number;
  answerState?: object;
}

interface IQuizFromDB {
  id: string;
  theme: string;
}

export default function quizReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: action.quizzes,
      };
    case FETCH_QUIZZES_ERROR:
      return {
        ...state,
        loading: false,
        action: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      };
    default:
      return state;
  }
}
