import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import FeedBack from "../pages/FeedBack";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Feedback page tests', ()=> {
  it('Verify if render all components', () => {
    renderWithRouterAndRedux(<FeedBack />);

    const imgGravatar = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const feedbackText = screen.getByTestId('feedback-text');
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');

    expect(imgGravatar).toBeDefined();
    expect(playerName).toBeDefined();
    expect(score).toBeDefined();
    expect(feedbackText).toBeDefined();
    expect(totalScore).toBeDefined();
    expect(totalQuestion).toBeDefined();
    
    // screen.logTestingPlaygroundURL();
  });

  it('Validate button Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    history.push('/feedback');
    const btnPlay = screen.getByTestId('btn-play-again');


    userEvent.click(btnPlay);

    expect(btnPlay).toBeDefined();

    expect(history.location.pathname).toBe('/');
  })

  it('Validate button Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking);

    expect(btnRanking).toBeDefined();
    expect(history.location.pathname).toBe('/ranking')
  })

  it('Validate when 3 answers corrects, show text Well Done', () => {
    renderWithRouterAndRedux(<FeedBack />,
    {
        player: {
          score: 4,
        }
    }
    );
    // screen.logTestingPlaygroundURL();

    const wellDoneText = screen.getByText(/well done/i);

    expect(wellDoneText).toBeDefined();

  })
})