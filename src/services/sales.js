import axios from "axios";

export function findProductByCode(code) {
  return axios.get("http://localhost:4000/api/products/product", {
    params: { code },
  });
}

export function createInvoice() {
  return axios.post("http://localhost:4000/api/invoices/invoice");
}
