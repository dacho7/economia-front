import axios from 'axios';

export function CREATEACCOUNT(document) {
  return axios.post(
    'http://localhost:4000/api/accounts/createaccount',
    { document },
  );
}

export function FINDACCOUNT(document) {
  return axios.get('http://localhost:4000/api/accounts/findaccount', {
    params: { document },
  });
}
