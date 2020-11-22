import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  loading: false, // old value true
  quizzes: [],
  linksList: [
    { id: 1, theme: 'Movies vol.1' },
    { id: 2, theme: 'Movies vol.2' },
    { id: 3, theme: 'Star wars' },
  ],
  error: null,
};

export default function quizReducer(state = initialState, action: any) {
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
    default:
      return state;
  }
}
