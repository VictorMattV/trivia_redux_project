import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    index: 0,
    timer: 30,
    isDisabled: false,
  }

  componentDidMount() {
    this.questionsTimer2();
  }

  // componentDidUpdate() {
  //   this.questionsTimer();
  // }

  // disableButtons = () => {
  //   const { timer } = this.state;
  //   if (timer === 0) {
  //     this.setState({ isDisabled: true });
  //   }
  // }

  questionsTimer2 = () => {
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

  questionsTimer = () => {
    const { timer } = this.state;
    const milliseconds = 1000;
    if (timer) {
      setTimeout(() => this.setState({
        timer: timer - 1,
      }), milliseconds);
    }
  }

  handleClick = () => {
    const { index } = this.state;
    const { questions } = this.props;
    const arrLength = questions.length - 1;
    if (index < arrLength) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index });
    }
  }

  render() {
    const { index, timer, isDisabled } = this.state;
    const { loading, questions, logout } = this.props;
    if (logout) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        {!loading && (
          <section>
            <h3 data-testid="question-category">{questions[index].category}</h3>
            <p data-testid="question-text">{questions[index].question}</p>
            <div data-testid="answer-options">
              <button
                data-testid="correct-answer"
                type="button"
                onClick={ this.handleClick }
                disabled={ isDisabled }
              >
                {questions[index].correct_answer}
              </button>

              {questions[index].incorrect_answers.map((elem, i) => (
                <button
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  key={ i }
                  onClick={ this.handleClick }
                  disabled={ isDisabled }
                >
                  {elem}
                </button>
              ))}
            </div>
            <div>
              {timer}
            </div>
          </section>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string,
    ),
  })).isRequired,
  logout: PropTypes.bool.isRequired,
};

const mapStateToProps = (store) => ({
  loading: store.game.loading,
  questions: store.game.questions,
  logout: store.game.logout,
});

export default connect(mapStateToProps)(Game);
