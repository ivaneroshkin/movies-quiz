import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

interface FinishedQuizProps {
  onRetry: () => void;
  results: any;
  quiz: IQuiz;
}

export interface IQuiz {
  activeQuistion: number;
  answerState: null;
  isFinished: boolean;
  quiz: Array<ISingleQuiz>;
  results: {};
  title: string;
}

interface ISingleQuiz {
  id: number;
  question: string;
  rightAnswerId: number;
  answers: Array<ISingleAnswer>;
}

interface ISingleAnswer {
  id: number;
  text: string;
}

const FinishedQuiz = (props: FinishedQuizProps) => {
  const successCount: number = Object.keys(props.results).reduce(
    (total, key) => {
      if (props.results[key] === 'success') {
        total++;
      }
      return total;
    },
    0
  );

  return (
    <div className={classes.FinishedQuiz}>
      {successCount === props.quiz.quiz.length ? (
        <h2>Well done!</h2>
      ) : (
        <h2>Well, well, well...</h2>
      )}

      <p>
        Right answers: {successCount}/{props.quiz.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Retry
        </Button>
        <Link to={'/'}>
          <Button type="success">Quiz List</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
