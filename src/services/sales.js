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

export function finishInvoice(idInvoice, total, client) {
  return axios.put("http://localhost:4000/api/invoices/invoice", {
    idInvoice,
    total,
    client,
  });
}

export function undoSales(ids) {
  const idSales = JSON.stringify(ids);
  return axios.delete("http://localhost:4000/api/sales/sales", {
    data: { idSales },
  });
}

export function registerProduct(
  description,
  costPrice,
  salePrice,
  quantity,
  type,
  expireDate
) {
  return axios.post("http://localhost:4000/api/products/product", {
    description,
    costPrice,
    salePrice,
    quantity,
    type,
    expireDate,
  });
}

export function findProductByDescription(description) {
  return axios.get("http://localhost:4000/api/products/productdescription", {
    params: { description },
  });
}

export function updateProduct(
  idProduct,
  costPrice,
  salePrice,
  quantity,
  expireDate,
  state
) {
  return axios.put("http://localhost:4000/api/products/productupdate", {
    idProduct,
    costPrice,
    salePrice,
    quantity,
    expireDate,
    state,
  });
}
