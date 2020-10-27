import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

interface FinishedQuizProps {
  onRetry: any;
  results: any;
  quiz: Array<any>;
}

const FinishedQuiz = (props: FinishedQuizProps) => {
  console.log('Correct answers', props.results);

  const successCount: any = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <h1>Well done!</h1>
      <p>
        Right answers: {successCount}/{props.quiz.length}
      </p>
      <Button onClick={props.onRetry} type="primary">
        Retry
      </Button>
      <Button type="success">
        Other quiz
      </Button>
    </div>
  );
};

export default FinishedQuiz;
