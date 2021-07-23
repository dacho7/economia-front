<template>
  <v-main>
    <v-container mt-4>
      <v-layout xs12>
        <v-flex xs6 align-self-center>
          <v-text-field
            color="blue-grey lighten-2"
            label="Cliente"
            v-model="client"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs6 ml-5>
          <h4>Fecha</h4>
          <h4>{{ date }}</h4>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <template>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Code</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-left">
                  <v-text-field v-model="amount"></v-text-field>
                </th>
                <td v-on:keyup.enter="registerSale(code)">
                  <v-text-field
                    outlined
                    ref="refcode"
                    v-model="code"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-simple-table fixed-header height="500px">
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
                <td>{{ item.description }}</td>
                <td class="text-right">${{ item.subtotal }}</td>
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
          @click="finishInvoice()"
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
            <v-btn align="right" color="primary" text @click="dialog = false">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import {
  findProductByCode,
  createInvoice,
  registerSale,
  finishInvoice,
  undoSales,
} from "../services/sales";

export default {
  name: "RegisterSales",
  data() {
    return {
      client: "",
      date: "",
      total: 0,
      code: "",
      amount: 1,
      invoice: "",
      products: [],
      dialog: false,
    };
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
    calculatetotal() {
      let total = 0;
      this.products.forEach((sale) => {
        total += sale.subtotal;
      });
      this.total = total;
    },
    registerSale(code) {
      findProductByCode(code)
        .then((product) => {
          if (product.data.ok) {
            registerSale(
              this.invoice,
              product.data.data.idProduct,
              this.amount,
              product.data.data.salePrice * this.amount
            )
              .then((sale) => {
                const newSale = {
                  amount: this.amount,
                  description: product.data.data.description,
                  subtotal: sale.data.data.subtotal,
                  idSale: sale.data.data.idSale,
                  idProduct: sale.data.data.idProduct,
                  idInvoice: sale.data.data.invoice,
                };
                this.products.push(newSale);
                this.code = "";
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
    },
    createInvoice() {
      createInvoice()
        .then((result) => {
          this.invoice = result.data.data.idInvoice;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    finishInvoice() {
      let total = 0;
      this.products.forEach((sale) => {
        total += sale.subtotal;
      });
      finishInvoice(this.invoice, total, this.client)
        .then(() => {
          this.products = [];
          this.total = 0;
          createInvoice();
        })
        .catch((err) => console.log(err));
    },
    undoSales() {
      let ids = [];
      this.products.forEach((product) => ids.push(product.idSale));
      undoSales(ids)
        .then(() => {
          this.products = [];
          this.total = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getDate();
    this.createInvoice();
  },
  mounted() {
    this.$refs["refcode"].focus();
  },
};
</script>
