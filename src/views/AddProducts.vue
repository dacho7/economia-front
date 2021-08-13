<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-5">
        <h1>Recibir Entrega</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="center-text">Buscar Producto por Descripción</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          @keyup="findByDescription()"
          v-model="description"
          label="Descripcion"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-on:input="getByDescription"
          :items="products"
          v-model="id"
          item-value="idProduct"
          item-text="description"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Buscar Producto por Código</h2>
        <v-text-field
          @keydown.enter="findByCode()"
          v-model="code"
          label="Código"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center mt-4 mb-4">
        <h2>{{ getBycode }}</h2>
      </v-col>
      <v-container>
        <v-simple-table>
          <thead>
            <th><h4>Cantidad</h4></th>
            <th><h4>Total</h4></th>
            <th><h4>Precio Unitario</h4></th>
            <th><h4>Fecha de Expiracion</h4></th>
          </thead>
          <tbody>
            <td width="20px">
              <v-text-field v-model="amount"></v-text-field>
            </td>
            <td width="180px">
              <v-text-field v-model="total"></v-text-field>
            </td>
            <td width="160px">
              <v-text-field disabled v-model="getUnitPrice"></v-text-field>
            </td>
            <td width="160px">
              <v-text-field type="date" v-model="expireDate"></v-text-field>
            </td>
          </tbody>
        </v-simple-table>

        <v-row class="text-center">
          <v-col>
            <v-btn @click="finish" class="primary">Terminar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import {
  findProductByDescription,
  findProductByCode,
  updateProduct,
} from "../services/sales";
export default {
  name: "AddProducts",
  data() {
    return {
      product: null,
      code: "",
      id: "",
      description: "",
      amount: 10,
      total: 0,
      expireDate: "5/22/2024",
      products: [],
    };
  },
  computed: {
    getBycode() {
      if (this.product) {
        return `${this.product.description} | ${this.product.quantity} unidades | $ ${this.product.costPrice} precio unitario`;
      }
      return "";
    },
    getUnitPrice() {
      return this.total / this.amount;
    },
  },
  methods: {
    findByDescription() {
      if (this.description.length >= 3)
        findProductByDescription(this.description).then((productsDB) => {
          let prod = [];
          if (productsDB.data.ok) {
            productsDB.data.data.forEach((product) => {
              prod.push(product);
            });
            this.products = prod;
          } else {
            this.products = [];
            this.id = "";
          }
        });
      if (this.description.trim().length < 3) {
        this.products = [];
      }
    },
    findByCode() {
      findProductByCode(this.code).then((result) => {
        this.product = result.data.data;
        this.code = "";
      });
    },
    getByDescription() {
      this.products.forEach((product) => {
        if (this.id == product.idProduct) {
          this.product = product;
        }
      });
    },
    finish() {
      const unitPrice =
        (this.product.quantity * this.product.costPrice + this.total) /
        (this.product.quantity + this.amount);
      const amount =
        parseFloat(this.amount) + parseFloat(this.product.quantity);
      console.log("precio unitario", unitPrice);
      updateProduct(
        this.product.idProduct,
        unitPrice,
        3000,
        amount,
        this.expireDate,
        "ACTIVE"
      )
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
