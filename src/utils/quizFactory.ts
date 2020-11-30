export interface Question {
  question: string;
  id: number;
  rightAnswerId: number;
  answers: Array<Answer>;
}

export interface Answer {
  id: number;
  text: string;
}

export function createQuiz(questions: Array<Question>) {
  console.log('createQuiz:', questions);

  return {
    title: 'Created Quiz',
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [...questions],
    loading: false,
  };
}
