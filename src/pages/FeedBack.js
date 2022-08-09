import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { correctAnswersCheck, score, history } = this.props;
    const three = 3;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <p data-testid="feedback-text">
            {correctAnswersCheck < three ? 'Could be better...' : 'Well Done!' }
          </p>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{correctAnswersCheck}</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again

          </button>
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  correctAnswersCheck: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswersCheck: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(FeedBack);
