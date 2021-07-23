import axios from "axios";

export function findProductByCode(code) {
  return axios.get("http://localhost:4000/api/products/product", {
    params: { code },
  });
}

export function createInvoice() {
  return axios.post("http://localhost:4000/api/invoices/invoice");
}

export function registerSale(invoice, product, amount, subtotal) {
  return axios.post("http://localhost:4000/api/sales/sale", {
    invoice,
    product,
    amount,
    subtotal,
  });
}

export function finishInvoice(idInvoice, total) {
  return axios.put("http://localhost:4000/api/invoices/invoice", {
    idInvoice,
    total,
  });
}

export function undoSales(ids) {
  const idSales = JSON.stringify(ids);
  return axios.delete("http://localhost:4000/api/sales/sales", {
    data: { idSales },
  });
}
