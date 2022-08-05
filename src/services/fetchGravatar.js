import md5 from 'crypto-js/md5';

const fetchGravatar = (email) => {
  const hashValue = md5(email).toString();
  const gravatarUrl = `https://www.gravatar.com/avatar/${hashValue}`;
  return gravatarUrl;
};

export default fetchGravatar;
