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
      {successCount === props.quiz.length ? (
        <h2>Well done!</h2>
      ) : (
        <h2>Well, well, well...</h2>
      )}

      <p>
        Right answers: {successCount}/{props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Retry
        </Button>
        <Button type="success">Other quiz</Button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
