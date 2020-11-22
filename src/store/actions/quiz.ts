import axios from 'axios';
import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
} from './actionTypes';

interface Link {
  id: number | string;
  theme: string;
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

      // this.setState({
      //   quizzes,
      //   loading: false,
      // });

      dispatch(fetchQuizzesSuccess(quizzes));
    } catch (error) {
      // console.log(error);
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
