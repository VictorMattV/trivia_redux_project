export const USER_LOGIN = 'USER_LOGIN';

export const loginAction = (payload) => ({ type: USER_LOGIN, payload });

// export const requestToken = () => {
//   return async (dispatch) => {
//     try {
//       const url = 'https://opentdb.com/api_token.php?command=request';
//       const response = await fetch(url);
//       const json = response.json();

//     }
//   }
// }
