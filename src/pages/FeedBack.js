import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <p>{assertions < three ? 'Could be better...' : 'Well Done!' }</p>
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
