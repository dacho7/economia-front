import axios from "axios";

export function FINDPRODUCTBYSTATE(state) {
  return axios.get("http://localhost:4000/api/products/findbystate", {
    params: { state },
  });
}
