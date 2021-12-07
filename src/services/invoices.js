import axios from 'axios';

export function FINDINVOICECERO() {
  return axios.get(
    'http://localhost:4000/api/invoices/findinvoicecero',
  );
}

export function COMPLETEINVOICE(
  id_invoice,
  total,
  client,
  name_client,
) {
  return axios.put(
    'http://localhost:4000/api/invoices/updateinvoice',
    {
      id_invoice,
      total,
      client,
      name_client,
    },
  );
}
