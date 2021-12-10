import axios from 'axios';

export function REGISTERCLIENT(
  document,
  names,
  surnames,
  addres,
  phone,
  email,
) {
  return axios.post('http://localhost:4000/api/users/createclient', {
    document,
    names,
    surnames,
    addres,
    phone,
    email,
  });
}

export function FINDCLIENT(document) {
  return axios.get('http://localhost:4000/api/users/findclient', {
    params: { document },
  });
}
