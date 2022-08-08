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
    questionsAll: [],
  }

  componentDidMount() {
    const { loading } = this.props;
    const { index } = this.state;
    if (!loading) {
      this.randomAnswer(index);
    }
    this.questionsTimer();
  }

  randomAnswer = (index) => {
    const { questions } = this.props;
    console.log(questions);
    const questionsInc = questions[index].incorrect_answers;
    const questionsAll = questionsInc.concat(questions[index].correct_answer);
    console.log(questionsAll);
    for (let i = 0; i < questionsAll.length; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsAll[i], questionsAll[j]] = [questionsAll[j], questionsAll[i]];
    }
    this.setState({ questionsAll });
    console.log(questionsAll);
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

  handleClick = () => {
    const { index } = this.state;
    const { questions } = this.props;
    const arrLength = questions.length - 1;
    if (index < arrLength) {
      this.setState({ index: index + 1 }, () => this.randomAnswer(index));
    } else {
      this.setState({ index }, () => this.randomAnswer(index));
    }
  }

  render() {
    const { index, timer, isDisabled, questionsAll } = this.state;
    const { loading, questions, logout } = this.props;
    if (logout) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        {!loading && questions.length && (
          <section>
            <h3 data-testid="question-category">{questions[index].category}</h3>
            <p data-testid="question-text">{questions[index].question}</p>
            <div data-testid="answer-options" className="answer-options">
              {questionsAll.map((elem, i) => (
                (elem === questions[index].correct_answer)
                  ? (
                    <button
                      data-testid="correct-answer"
                      type="button"
                      onClick={ this.handleClick }
                      disabled={ isDisabled }
                    >
                      {elem}
                    </button>)
                  : (
                    <button
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      key={ i }
                      onClick={ this.handleClick }
                      disabled={ isDisabled }
                    >
                      {elem}
                    </button>
                  )
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
