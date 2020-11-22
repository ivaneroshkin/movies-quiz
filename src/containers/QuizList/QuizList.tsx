import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import { fetchQuizzes } from '../../store/actions/quiz';

import classes from './QuizList.module.css';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';

interface QuizListProps {
  loading: boolean;
  quizzes: Array<Link>;
  linksList: Array<Link>;
  fetchQuizzes: any;
}
interface QuizListState {
  loading: boolean;
  quizzes: Array<Link>;
  linksList: Array<Link>;
}

interface Link {
  id: number | string;
  theme: string;
}

class QuizList extends Component<QuizListProps, QuizListState> {
  // state = {
  //   loading: true,
  //   quizzes: [],
  //   linksList: [
  //     { id: 1, theme: 'Movies vol.1' },
  //     { id: 2, theme: 'Movies vol.2' },
  //     { id: 3, theme: 'Star wars' },
  //   ],
  // };

  renderQuizes() {
    let allQuizzesLinks = this.props.quizzes.length
      ? [...this.props.linksList, ...this.props.quizzes]
      : [...this.props.linksList];

    return allQuizzesLinks.map((link, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + link.id}>
            <Button type="linked">{link.theme}</Button>
          </NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizzes();

    // try {
    //   const quizzes: Array<Link> = [];
    //   const response = await axios.get(
    //     'https://movies-quiz-555.firebaseio.com/quizzes.json'
    //   );

    //   Object.keys(response.data).forEach((key, index) => {
    //     quizzes.push({
    //       id: key,
    //       theme: `Test quiz ${index + 1}`,
    //     });
    //   });

    //   this.setState({
    //     quizzes,
    //     loading: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.QuizListWrapper}>
          <h2>Quiz List</h2>
          {this.props.loading && this.props.quizzes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading,
    linksList: state.quiz.linksList,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchQuizzes: () => dispatch(fetchQuizzes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
