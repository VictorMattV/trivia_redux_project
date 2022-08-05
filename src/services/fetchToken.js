const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const json = await response.json();

  localStorage.setItem('token', json.token);
};

export default fetchToken;
