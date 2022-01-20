import axios from 'axios';

export function CREATEPRODUCTTYPE(description) {
  return axios.post(
    'http://localhost:4000/api/producttype/createtypeproduct',
    {
      description,
    },
  );
}

export function LISTPRODUCTSTYPE() {
  return axios.get(
    'http://localhost:4000/api/producttype/listproductstype',
  );
}
