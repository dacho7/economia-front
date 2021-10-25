<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>
                <h1 class="text-center">Registrar Ventas</h1>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container class="ml-5">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    color="blue-grey lighten-2"
                    label="Factura a Nombre de "
                    v-model="headline"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-container>
          <template>
            <v-simple-table>
              <template>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Code</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="text-left">
                      <v-text-field
                        type="number"
                        v-model="amount"
                      ></v-text-field>
                    </th>
                    <td v-on:keyup.enter="registerSale(code)">
                      <v-text-field autofocus v-model="code"></v-text-field>
                    </td>
                    <td>
                      <v-btn @click="dialogAnonymous = true"
                        >Agregar venta sin codigo</v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-simple-table fixed-header height="460px">
              <template mt-6 v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Descripcion</th>
                    <th class="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in products" :key="index">
                    <td>{{ item.amount }}</td>
                    <td>{{ item.description | capitalize }}</td>
                    <td class="text-right">{{ item.subtotal | currency }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-container>

        <v-container>
          <v-layout>
            <v-flex>
              <h2 align="center" class="ml-4">Total</h2>
            </v-flex>
            <v-flex>
              <h2 align="center">{{ total | currency }}</h2>
            </v-flex>
          </v-layout>
          <v-layout align="button">
            <v-btn
              :disabled="products.length === 0"
              @click="answerAcept()"
              block
              x-large
              class="success mt-4"
              >Finalizar Compra</v-btn
            >
          </v-layout>
        </v-container>

        <v-container>
          <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="products.length === 0"
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Cancelar Compra
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 red lighten-2">
                Cacelar Compra
              </v-card-title>

              <v-card-text>
                <br />
                Esta seguro que desea cancelar la compra?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="
                    dialog = false;
                    undoSales();
                  "
                >
                  Aceptar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  align="right"
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
        <ConfirmSale
          :dialog="showConfirmSale"
          @cancel="showConfirmSale = false"
          @acept="finishInvoice()"
        ></ConfirmSale>
        <AnonymousSale
          :invoice="invoice"
          :dialog="dialogAnonymous"
          @cancelAnonymousSale="dialogAnonymous = false"
          @aceptAnonymousSale="eventSoon"
        />
        <br />
        <br />
        <br />
        <br />
        <invoice-to-print
          :client="headline"
          :products="products"
          :total="total"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  findProductByCode,
  createInvoice,
  registerSale,
  finishInvoice,
  undoSales,
} from "../services/sales";
import AnonymousSale from "../components/sales/AnonymousSale.vue";
import InvoiceToPrint from "../components/sales/InvoiceToPrint.vue";
import ConfirmSale from "../components/confirmDialog/ConfirmSale";
import printJS from "print-js";

export default {
  name: "RegisterSales",
  data() {
    return {
      headline: "",
      client: "",
      document: null,
      date: "",
      total: 0,
      code: "",
      amount: 1,
      invoice: "",
      products: [],
      dialog: false,
      dialogAnonymous: false,
      toPrint: false,
      showConfirmSale: false,
    };
  },
  components: {
    AnonymousSale,
    InvoiceToPrint,
    ConfirmSale,
  },
  methods: {
    getDate() {
      let dat = new Date();

      let day = dat.getDate();
      let month = dat.getMonth() + 1;

      let minutes = dat.getMinutes();
      let hours = dat.getHours();

      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      const date = `${day}/${month}/${dat.getFullYear()} ${hours}:${minutes}`;
      this.date = date;
    },
    registerSale(code) {
      if (code != "") {
        findProductByCode(code)
          .then((product) => {
            if (product.data.ok) {
              registerSale(
                this.invoice,
                product.data.data.id_product,
                this.amount,
                product.data.data.sale_price * this.amount,
                product.data.data.cost_price
              )
                .then((sale) => {
                  const newSale = {
                    amount: this.amount,
                    description: product.data.data.description,
                    subtotal: sale.data.data.subtotal,
                    id_sale: sale.data.data.id_sale,
                    id_product: sale.data.data.id_product,
                    id_invoice: sale.data.data.invoice,
                    cost_price: sale.data.data.cost_price,
                  };
                  this.products.push(newSale);
                  this.code = "";
                  this.amount = 1;
                  this.total += sale.data.data.subtotal;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            this.code = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    createInvoice() {
      createInvoice()
        .then((result) => {
          this.invoice = result.data.data.id_invoice;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    finishInvoice() {
      this.showConfirmSale = false;
      let total = 0;
      this.products.forEach((sale) => {
        total += sale.subtotal;
      });
      finishInvoice(this.invoice, total, this.client)
        .then(() => {
          this.products = [];
          this.total = 0;
          this.client = "";
          this.amount = 1;
          this.printInvoice();
          this.createInvoice();
        })
        .catch((err) => console.log(err));
    },
    undoSales() {
      let ids = [];
      this.products.forEach((product) => ids.push(product.id_sale));
      undoSales(ids)
        .then(() => {
          this.products = [];
          this.total = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    eventSoon(newSale) {
      this.products.push(newSale);
      this.dialogAnonymous = false;
    },
    changeshowConfirmSaleFalse() {
      this.showConfirmSale = false;
    },
    answerAcept() {
      this.showConfirmSale = true;
    },
    printInvoice() {
      this.toPrint = true;
      printJS("printJS-form", "html");
    },
  },
  created() {
    this.getDate();
    this.createInvoice();
  },
};
</script>
