import axios from "axios";

export function findProductByCode(code) {
  return axios.get("http://localhost:4000/api/products/product", {
    params: { code },
  });
}

export function createInvoice() {
  return axios.post("http://localhost:4000/api/invoices/invoice");
}

export function registerSale(invoice, product, amount, subtotal, cost_price) {
  return axios.post("http://localhost:4000/api/sales/sale", {
    invoice,
    product,
    amount,
    subtotal,
    cost_price,
  });
}

export function finishInvoice(id_invoice, total, client) {
  return axios.put("http://localhost:4000/api/invoices/invoice", {
    id_invoice,
    total,
    client,
  });
}

export function undoSales(ids) {
  const id_sales = JSON.stringify(ids);
  return axios.delete("http://localhost:4000/api/sales/sales", {
    data: { id_sales },
  });
}

export function registerProduct(
  description,
  cost_price,
  sale_price,
  quantity,
  type,
  expire_date
) {
  return axios.post("http://localhost:4000/api/products/product", {
    description,
    cost_price,
    sale_price,
    quantity,
    type,
    expire_date,
  });
}

export function findProductByDescription(description) {
  return axios.get("http://localhost:4000/api/products/productdescription", {
    params: { description },
  });
}

export function updateProduct(
  id_product,
  cost_price,
  sale_price,
  quantity,
  expire_date,
  state
) {
  return axios.put("http://localhost:4000/api/products/productupdate", {
    id_product,
    cost_price,
    sale_price,
    quantity,
    expire_date,
    state,
  });
}
