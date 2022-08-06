import React from 'react';
import Header from '../components/Header';
import fetchQuestions from '../services/fetchQuestions';

class Game extends React.Component {
  state = {
    // category: '',
    questions: [],
    index: 0,
    loading: true,
    // type: '',
    // correctAnswer: '',
    // incorrectAnswer: '',
  }

  async componentDidMount() {
    const resultsFetch = await fetchQuestions();
    const questions = resultsFetch.results;
    this.setState({
      questions }, () => {
      this.setState({ loading: false });
      // const { category, question, type, correct_answer, incorrect_answers } = questions.results;
      // category: questions.results.category,
      // question: questions.results.question,
      // type: questions.results.type,
      // correctAnswer: questions.results.correct_answer,
      // incorrectAnswer: questions.results.incorrect_answers,
    });
  }

  onClick = () => {
    const { index, questions } = this.state;
    const arrLength = questions.length - 1;
    if (index <= arrLength) {
      this.setState({ index: index + 1 });
    }
  }

  render() {
    const { questions, index, loading } = this.state;
    return (
      <div>
        <Header />
        {loading
          ? <p>Loading</p>
          : (
            <section>
              <h3 data-testid="question-category">{questions[index].category}</h3>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                <button
                  data-testid="correct-answer"
                  type="button"
                  onClick={ this.onClick }
                >
                  {questions[index].correct_answer}
                </button>

                {questions[index].incorrect_answers.map((elem, i) => (
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    type="button"
                    key={ i }
                    onClick={ this.onClick }
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
