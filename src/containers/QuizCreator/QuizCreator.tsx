import React, { ChangeEvent, Component, Dispatch, FormEvent } from 'react';
import { connect } from 'react-redux';
import classes from './QuizCreator.module.css';

import {
  createQuizQuestion,
  finishCreateQuiz,
} from '../../store/actions/create';
import {
  Control,
  Controls,
  createControl,
  validate,
  validateForm,
  getKeyByValue,
} from '../../utils/formFactory';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { IRootState } from '../../App';

interface QuizCreatorProps {
  quiz: [];
  createQuizQuestion: (item: object) => void;
  finishCreateQuiz: () => void;
}
interface QuizCreatorState {
  isFormValid: boolean;
  rightAnswerId?: number;
  formControls: Controls;
}

function createOptionControl(number: number) {
  return createControl(
    {
      label: `Option ${number}`,
      id: number,
      errorMessage: 'Invalid',
    },
    {
      required: true,
    }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Enter question',
        errorMessage: 'Invalid',
      },
      {
        required: true,
      }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component<QuizCreatorProps, QuizCreatorState> {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  addQuestionHandler = (event: Event) => {
    event.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem: object = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = (event: Event) => {
    event.preventDefault();
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
    this.props.finishCreateQuiz();
  };

  changeHandler = (value: string, control: Control) => {
    const formControls: Controls = {
      ...this.state.formControls,
    };
    const newControl: Control = { ...control };

    newControl.touched = true;
    newControl.value = value;
    newControl.valid = validate(control.value, control.validation);

    const key: string = getKeyByValue(formControls, newControl);
    formControls[key] = newControl;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  selectChangeHandler = (event: any) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  renderControls = () => {
    return Object.values(this.state.formControls).map((control, index) => {
      return (
        <Input
          key={control.label + index}
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
          onChange={(event: ChangeEvent<any>) =>
            this.changeHandler(event.target.value, control)
          }
        />
      );
    });
  };

  render() {
    const select = (
      <Select
        label="Choose answer"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div className={classes.QuizCreatorWrapper}>
          <h2>Quiz Creator</h2>
          <form
            onSubmit={this.submitHandler}
            className={classes.QuizCreatorForm}
          >
            <div className={classes.QuizCreatorControls}>
              {this.renderControls()}
            </div>
            <div className={classes.QuizCreatorButtons}>
              {select}
              <Button
                type="primary"
                onClick={this.addQuestionHandler}
                isDisabled={!this.state.isFormValid}
              >
                Add Question
              </Button>
              <Button
                type="success"
                onClick={this.createQuizHandler}
                isDisabled={this.props.quiz.length === 0}
              >
                Create Quiz
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    createQuizQuestion: (item: object) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
