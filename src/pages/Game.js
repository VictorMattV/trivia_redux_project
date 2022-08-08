import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import fetchQuestions from '../services/fetchQuestions';

class Game extends React.Component {
  state = {
    index: 0,
  }

  componentDidMount() {
    // this.fetchCalling();
  }

  // fetchCalling = async () => {
  //   const resultsFetch = await fetchQuestions();
  //   const questions = resultsFetch.results;
  //   if (!questions.length) {
  //     localStorage.removeItem('token');
  //     this.setState({ logout: true });
  //   }
  //   this.setState({
  //     questions }, () => {
  //     this.setState({ loading: false });
  //   });
  // }

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
    const { index } = this.state;
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
              >
                {questions[index].correct_answer}
              </button>

              {questions[index].incorrect_answers.map((elem, i) => (
                <button
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  key={ i }
                  onClick={ this.handleClick }
                >
                  {elem}
                </button>
              ))}

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
