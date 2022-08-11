import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import fetchGravatar from '../services/fetchGravatar';
import '../styles/Feedback.css';

class FeedBack extends React.Component {
  componentDidMount() {
    const { username, email, score } = this.props;
    const userRanking = {
      username,
      score,
      img: this.getGravatarImage(email),
    };
    const userRankingLocal = JSON.parse(localStorage.getItem('userRanking')) || [];
    userRankingLocal.push(userRanking);
    localStorage.setItem('userRanking', JSON.stringify(userRankingLocal));
  }

  getGravatarImage = (email) => {
    const image = fetchGravatar(email);
    return image;
  }

  render() {
    const { correctAnswersCheck, score, history } = this.props;
    const three = 3;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="feedbackContainer">
          <h3 data-testid="feedback-text">
            {correctAnswersCheck < three ? 'Could be better...' : 'Well Done!' }
          </h3>
          <h4>Total Score:</h4>
          <p data-testid="feedback-total-score">{score}</p>
          <h4>Correct Answers:</h4>
          <p data-testid="feedback-total-question">{correctAnswersCheck}</p>
          <div className="btnsRanking">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/') }
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  correctAnswersCheck: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswersCheck: state.player.assertions,
  score: state.player.score,
  username: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps, null)(FeedBack);
