import axios from "axios";

export function FINDPRODUCTBYSTATE(state) {
  return axios.get("http://localhost:4000/api/products/findbystate", {
    params: { state },
  });
}

export function FINDPRODUCTSBYDESCRIPTION(description) {
  return axios.get("http://localhost:4000/api/products/productdescription", {
    params: { description },
  });
}

export function FINDPRODUCTBYID(id) {
  return axios.get("http://localhost:4000/api/products/findById", {
    params: { id },
  });
}

export function UPDATEPRODUCTSTATE(id_product, state) {
  return axios.put("http://localhost:4000/api/products/productupdatestate", {
    id_product,
    state,
  });
}

export function UPDATEPRICEPRODUCT(id_product, sale_price) {
  return axios.put(
    "http://localhost:4000/api/products/productupdatesaleprice",
    {
      id_product,
      sale_price,
    }
  );
}
