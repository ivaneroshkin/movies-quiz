import axios from 'axios';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';

export function createQuizQuestion(item: object) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}

export function finishCreateQuiz() {
  return async (dispatch: any, getState: any) => {
    await axios.post(
      'https://movies-quiz-555.firebaseio.com/quizzes.json',
      getState().create.quiz
    );
    dispatch(resetQuizCreation());
  };
}
