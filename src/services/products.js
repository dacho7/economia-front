import axios from 'axios';

export function REGISTERPRODUCT(
  description,
  code,
  total_price,
  quantity,
  type,
  expire_date,
) {
  return axios.post('http://localhost:4000/api/products/product', {
    description,
    code,
    total_price,
    quantity,
    type,
    expire_date,
  });
}

export function FINDPRODUCTBYSTATE(state) {
  return axios.get('http://localhost:4000/api/products/findbystate', {
    params: { state },
  });
}

export function FINDPRODUCTSBYDESCRIPTION(description) {
  return axios.get(
    'http://localhost:4000/api/products/productdescription',
    {
      params: { description },
    },
  );
}

export function FINDPRODUCTBYID(id) {
  return axios.get('http://localhost:4000/api/products/findById', {
    params: { id },
  });
}

export function FINDPRODUCTBYDATEUPDATE(date) {
  return axios.get(
    'http://localhost:4000/api/products/findbydateupdate',
    {
      params: { date },
    },
  );
}

export function UPDATEPRODUCTSTATE(id_product, state) {
  return axios.put(
    'http://localhost:4000/api/products/productupdatestate',
    {
      id_product,
      state,
    },
  );
}

export function UPDATEPRICEPRODUCT(id_product, sale_price) {
  return axios.put(
    'http://localhost:4000/api/products/productupdatesaleprice',
    {
      id_product,
      sale_price,
    },
  );
}

export function UPDATEPRODUCT(
  id_product,
  description,
  cost_price,
  sale_price,
  quantity,
  expire_date,
  date_price_update,
  date_arrive,
  type,
  state,
) {
  return axios.put(
    'http://localhost:4000/api/products/productupdate',
    {
      id_product,
      description,
      cost_price,
      sale_price,
      quantity,
      expire_date,
      date_price_update,
      date_arrive,
      type,
      state,
    },
  );
}

export function UPDATEQUANTITY(id_product, quantity) {
  return axios.put(
    'http://localhost:4000/api/products/productupdatequantity',
    { id_product, quantity },
  );
}
