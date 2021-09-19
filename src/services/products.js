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
