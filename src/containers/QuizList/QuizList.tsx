import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';

import Button from '../../components/UI/Button/Button';

interface QuizListProps {}
interface QuizListState {
  linksList: Array<object>;
}

class QuizList extends Component<QuizListProps, QuizListState> {
  state = {
    linksList: [
      { id: 1, theme: 'Movies vol.1' },
      { id: 2, theme: 'Movies vol.2' },
      { id: 3, theme: 'Star wars' }
    ],
  };

  renderQuizes() {
    return [...this.state.linksList].map((link, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + link.id}>
            <Button type="linked">{link.theme}</Button>
          </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.QuizListWrapper}>
          <h2>Quiz List</h2>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
