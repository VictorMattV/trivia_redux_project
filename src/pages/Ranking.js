// import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
      </>

    );
  }
}

export default Ranking;
