import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { requestQuestions, scoreAction, sumAssertion } from '../redux/actions';
import '../styles/Game.css';

class Game extends React.Component {
  state = {
    index: 0,
    timer: 30,
    isDisabled: false,
    questionsAll: [],
    classCorrect: '',
    classWrong: '',
    showBtn: false,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { index } = this.state;
    await dispatch(requestQuestions());
    const { questions } = this.props;
    if (questions.length) {
      this.randomAnswer(index);
    }
    this.questionsTimer();
  }

  randomAnswer = () => {
    const { questions } = this.props;
    const { index } = this.state;
    const questionsInc = questions[index].incorrect_answers;
    const questionsAll = questionsInc.concat(questions[index].correct_answer);
    for (let i = 0; i < questionsAll.length; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsAll[i], questionsAll[j]] = [questionsAll[j], questionsAll[i]];
    }
    this.setState({ questionsAll });
  }

  questionsTimer = () => {
    const milliseconds = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer) {
        this.setState({
          timer: timer - 1,
        });
      } else {
        this.setState({ isDisabled: true });
      }
    }, milliseconds);
  }

  showStyle = () => {
    this.setState({
      classCorrect: 'correct-answer',
      classWrong: 'wrong-answer',
      showBtn: true,
    });
  }

  hideStyle = () => {
    this.setState({
      classCorrect: '',
      classWrong: '',
      showBtn: false,
    });
  }

  handleNextBtn = () => {
    const { index } = this.state;
    const { questions, history } = this.props;
    const arrLength = questions.length - 1;
    if (index < arrLength) {
      this.setState((prev) => ({ index: prev.index + 1 }), () => {
        this.randomAnswer();
      });
    } else {
      history.push('/feedback');
    }
    this.setState({ isDisabled: false, timer: 30 }, () => this.hideStyle());
  }

  handleCorrectAnswer = () => {
    const { score, questions, dispatch } = this.props;
    const { timer, index } = this.state;
    const { difficulty } = questions[index];
    let questionDifficulty = 0;
    const hardQuestionPoints = 3;
    switch (difficulty) {
    case 'easy':
      questionDifficulty = 1;
      break;
    case 'medium':
      questionDifficulty = 2;
      break;
    case 'hard':
      questionDifficulty = hardQuestionPoints;
      break;
    default:
      questionDifficulty = 0;
      break;
    }
    const newScore = score + (timer * questionDifficulty);
    dispatch(scoreAction(newScore));
    dispatch(sumAssertion());
    this.setState({ isDisabled: false, timer: 0 });
    this.showStyle();
  }

  handleWrongAnswer = () => {
    this.showStyle();
    this.setState({ timer: 0 });
  }

  render() {
    const {
      index, timer, isDisabled, questionsAll, classCorrect, classWrong, showBtn,
    } = this.state;

    const { loading, questions, logout } = this.props;
    if (logout) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        {!loading && questions.length && (
          <section className="gameContainer">
            <h3
              data-testid="question-category"
              className="category"
            >
              {questions[index].category}
            </h3>
            <p data-testid="question-text">{questions[index].question}</p>
            {/* <p>{ questions[index].correct_answer }</p> */}
            <div data-testid="answer-options" className="answer-options">
              {questionsAll.map((elem, i) => (
                (elem === questions[index].correct_answer)
                  ? (
                    <button
                      data-testid="correct-answer"
                      className={ classCorrect }
                      type="button"
                      onClick={ this.handleCorrectAnswer }
                      disabled={ isDisabled }
                      key={ i }
                    >
                      {elem}
                    </button>)
                  : (
                    <button
                      data-testid={ `wrong-answer-${i}` }
                      className={ classWrong }
                      type="button"
                      key={ i }
                      onClick={ this.handleWrongAnswer }
                      disabled={ isDisabled }
                    >
                      {elem}
                    </button>
                  )
              ))}
            </div>
            <div
              data-testid="timer"
              className="timer"
            >
              {timer}
            </div>
            {(showBtn) && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNextBtn }
                className="nextBtn"
              >
                Next
              </button>
            )}
          </section>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.game.loading,
  questions: state.game.questions,
  logout: state.game.logout,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
