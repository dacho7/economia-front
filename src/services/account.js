import axios from 'axios';

export function CREATEACCOUNT(document) {
  return axios.post(
    'http://localhost:4000/api/accounts/createaccount',
    { document },
  );
}
