import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { correctAnswersCheck } = this.props;
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
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  correctAnswersCheck: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswersCheck: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
