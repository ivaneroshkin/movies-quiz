import React, { Component } from 'react';
import classes from './QuizList.module.css';

interface QuizListProps {}
interface QuizListState {}

class QuizList extends Component<QuizListProps, QuizListState> {
  state = {};

  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.QuizListWrapper}>
          <h2>Quiz List</h2>
        </div>
      </div>
    );
  }
}

export default QuizList;
