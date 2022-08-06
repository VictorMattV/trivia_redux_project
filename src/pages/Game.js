import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import fetchQuestions from '../services/fetchQuestions';

class Game extends React.Component {
  state = {
    questions: [],
    index: 0,
    loading: true,
    logout: false,
  }

  componentDidMount() {
    this.fetchCalling();
  }

  fetchCalling = async () => {
    const resultsFetch = await fetchQuestions();
    const questions = resultsFetch.results;
    if (!questions.length) {
      localStorage.removeItem('token');
      this.setState({ logout: true });
    }
    this.setState({
      questions }, () => {
      this.setState({ loading: false });
    });
  }

  handleClick = () => {
    const { index, questions } = this.state;
    const arrLength = questions.length - 1;
    if (index < arrLength) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index });
    }
  }

  render() {
    const { questions, index, loading, logout } = this.state;
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

export default Game;
