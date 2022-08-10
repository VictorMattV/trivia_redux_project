import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Ranking page tests', ()=> {
  it('Verify if render all components', () => {
    renderWithRouterAndRedux(<Ranking />);
    const rankingTitle = screen.getByRole('heading', {  name: /ranking/i});
    const btnGoHome = screen.getByRole('button', {  name: /go home/i});
    expect(rankingTitle).toBeInTheDocument();
    expect(btnGoHome).toBeInTheDocument();
  });
  it('Validate button Go Home', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const btnGoHome = screen.getByRole('button', {  name: /go home/i});
    userEvent.click(btnGoHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});