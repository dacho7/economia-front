import axios from 'axios';

export function MAKEMOVEMENT(account, type, description, mount) {
  return axios.post(
    'http://localhost:4000/api/transactions/createtransaction',
    {
      account,
      type,
      description,
      mount,
    },
  );
}
