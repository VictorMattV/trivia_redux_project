import fetchQuestions from '../../services/fetchQuestions';

export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_QUESTIONS_ERROR = 'RECEIVE_QUESTIONS_ERROR';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SUM_ASSERTION = 'SUM_ASSERTION';

export const loginAction = (payload) => ({ type: USER_LOGIN, payload });

export const requestQuestionsLoading = () => ({
  type: REQUEST_QUESTIONS,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const receiveQuestionsError = () => ({
  type: RECEIVE_QUESTIONS_ERROR,
});

export const sumAssertion = () => ({
  type: SUM_ASSERTION,
});

export const requestQuestions = () => async (dispatch) => {
  dispatch(requestQuestionsLoading());
  const response = await fetchQuestions();
  if (response.length) {
    dispatch(receiveQuestions(response));
  } else {
    dispatch(receiveQuestionsError());
  }
};

export const scoreAction = (payload) => ({ type: UPDATE_SCORE, payload });
