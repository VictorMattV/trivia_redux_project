import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Game from "../pages/Game";
import mockFetchReturn from "./helpers/mockFetchReturn";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Game page tests', () => {
    it('renders all components', async () => {
      const { history } = renderWithRouterAndRedux(<App />);

      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockFetchReturn),
      });

      const emailInput = screen.getByTestId('input-gravatar-email');
      const nameInput = screen.getByTestId('input-player-name');
      const loginBtn = screen.getByTestId('btn-play');

      userEvent.type(emailInput, 'tryber@trybe.com');
      userEvent.type(nameInput, 'Braddock');

      userEvent.click(loginBtn);
      await waitFor(() => expect(fetch).toBeCalled());
      expect(history.location.pathname).toBe('/game');

      const playerImg = screen.getByTestId('header-profile-picture');
      const playerName= screen.getByTestId('header-player-name');
      const playerScore = screen.getByTestId('header-score')
      const questionCategory = screen.getByTestId('question-category')
      const questionText = screen.getByTestId('question-text')
      const answerOptions = screen.getByTestId('answer-options');
      const correctAnswer = screen.getByTestId('correct-answer');
      const nextBtn = screen.queryByTestId('btn-next');
      const timer = screen.queryByTestId('timer');
    
      expect(playerImg).toBeInTheDocument();
      expect(playerName).toBeInTheDocument();
      expect(playerScore).toBeInTheDocument();
      expect(questionCategory).toBeInTheDocument();
      expect(questionText).toBeInTheDocument();
      expect(answerOptions).toBeInTheDocument();
      expect(correctAnswer).toBeInTheDocument();
      expect(nextBtn).not.toBeInTheDocument();
      expect(timer).toBeInTheDocument();

      
      userEvent.click(correctAnswer);
      const nextButton = screen.queryByTestId('btn-next');
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);

      
      const correctAnswer2 = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer2);
      const nextBtn2 = screen.queryByTestId('btn-next');
      userEvent.click(nextBtn2);

      
      const correctAnswer3 = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer3);
      const nextBtn3 = screen.queryByTestId('btn-next');
      screen.logTestingPlaygroundURL();
      userEvent.click(nextBtn3);

      const wrongAnswer = screen.getAllByTestId(/wrong-answer/i)[0];
      userEvent.click(wrongAnswer);
      const nextBtn4 = screen.queryByTestId('btn-next');
      userEvent.click(nextBtn4);

      const correctAnswer4 = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer4);
      const nextBtn5 = screen.queryByTestId('btn-next');
      userEvent.click(nextBtn5);

      expect(history.location.pathname).toBe('/feedback');


    })

    it('invalid token redirect to /',  () => {
      const { history } = renderWithRouterAndRedux(<App />,
      {
          game: {
            logout: true,
            questions: [],
          }
      })

      history.push('/game');

      expect(history.location.pathname).toBe('/');
    })

    it('disable options when the timer is zero',  async () => {
      renderWithRouterAndRedux(<App />);
      jest.useFakeTimers();
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockFetchReturn),
      });
      
      const emailInput = screen.getByTestId('input-gravatar-email');
      const nameInput = screen.getByTestId('input-player-name');
      const loginBtn = screen.getByTestId('btn-play');

      userEvent.type(emailInput, 'tryber@trybe.com');
      userEvent.type(nameInput, 'Braddock');

      userEvent.click(loginBtn);
      await waitFor(() => expect(fetch).toBeCalled());
      
      jest.advanceTimersByTime(31000);
      screen.logTestingPlaygroundURL();
      const correctAnswer = await screen.findByTestId('correct-answer');
      expect(correctAnswer).toBeDisabled();
      });
});
