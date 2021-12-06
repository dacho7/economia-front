import axios from 'axios';

export function REGISTERCLIENT(
  document,
  names,
  surnames,
  addres,
  phone,
) {
  return axios.post('http://localhost:4000/api/users/createclient', {
    document,
    names,
    surnames,
    addres,
    phone,
  });
}
