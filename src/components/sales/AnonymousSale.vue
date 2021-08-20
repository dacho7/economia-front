<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700">
      <template>
        <v-btn color="primary" dark> Venta No Registrada </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Buscar un producto o Agregar una venta Anonima.
        </v-card-title>
        <v-card-text>
          <h3>Ingrese Descripción</h3>
          <v-row>
            <v-col>
              <v-text-field
                v-model="description"
                label="descripción"
                @keyup="findByDescription"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-if="allProducts.length >= 1"
                v-model="product"
                :items="showAllProducts"
                label="Seleccione Producto"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <h2>{{ productResult }}</h2>
            </v-col>
          </v-row>
          <v-row v-if="description && product">
            <v-col>
              <v-text-field
                v-model="amount"
                type="number"
                label="cantidad"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="total"
                type="number"
                label="Total"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!description">
            <v-col>
              <v-text-field v-model="total" label="Total"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="sendFather">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { findProductByDescription } from "../../services/sales";

export default {
  name: "AnonymousSale",
  props: ["dialog"],
  data() {
    return {
      description: "",
      product: "",
      idProduct: "",
      amount: 1,
      total: 0,
      allProducts: [],
    };
  },
  computed: {
    productResult() {
      if (this.product) {
        return this.product;
      }
      return "Sin Descripción";
    },
    showAllProducts() {
      const products = [];
      this.allProducts.forEach((element) => {
        products.push(element.description);
      });
      return products;
    },
  },
  methods: {
    sendFather() {
      this.$emit("activate", {
        product: this.product,
        amount: this.amount,
        total: this.total,
        idProduct: this.idProduct,
      });
    },
    findByDescription() {
      if (this.description.length >= 3)
        findProductByDescription(this.description).then((productsDB) => {
          let prod = [];
          console.log(productsDB);
          if (productsDB.data.ok) {
            productsDB.data.data.forEach((product) => {
              prod.push(product);
            });
            this.allProducts = prod;
          } else {
            this.allProducts = [];
            this.id = "";
          }
        });
      if (this.description.trim().length < 3) {
        this.allProducts = [];
        this.product = "";
      }
    },
  },
};
</script>
