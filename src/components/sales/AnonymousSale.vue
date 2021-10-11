<template>
  <v-row justify="center" align="center">
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
                label="Ingrese Descripción"
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
              <h3 v-else>No se encontraron productos</h3>
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
                v-model="totalwithProduct"
                type="number"
                label="Total"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!description">
            <v-col>
              <v-text-field
                class="centered-input"
                autofocus
                type="number"
                v-model="total"
                label="Total"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="clean"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="total < 50"
            color="green darken-1"
            text
            @click="acept"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { findProductByDescription, registerSale } from "../../services/sales";

export default {
  name: "AnonymousSale",
  props: ["dialog", "invoice"],
  data() {
    return {
      description: "",
      product: "",
      id_product: "",
      amount: 1,
      total: null,
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
    totalwithProduct() {
      let totalPrice = 0;
      this.allProducts.forEach((product) => {
        if (this.product === product.description) {
          totalPrice = this.amount * product.sale_price;
        }
      });
      return totalPrice;
    },
  },
  methods: {
    acept() {
      if (!this.product) {
        this.id_product = "101010";
      } else {
        this.allProducts.forEach((product) => {
          if (this.product === product.description) {
            this.id_product = product.id_product;
            this.total = this.amount * product.sale_price;
          }
        });
      }
      if (!this.description) this.product = "No registrado";
      const cost_price = this.total / (1 + 0.1);
      registerSale(
        this.invoice,
        this.id_product,
        this.amount,
        this.total,
        cost_price
      )
        .then((sale) => {
          const newSale = {
            amount: this.amount,
            description: this.product,
            subtotal: sale.data.data.subtotal,
            id_sale: sale.data.data.id_sale,
            id_product: sale.data.data.id_product,
            id_invoice: sale.data.data.invoice,
          };
          this.$emit("aceptAnonymousSale", newSale);
          this.clean();
        })
        .catch((e) => console.log(e));
    },
    findByDescription() {
      if (this.description.length >= 3)
        findProductByDescription(this.description).then((productsDB) => {
          let prod = [];
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
    clean() {
      this.description = "";
      this.product = "";
      this.id_product = "";
      this.total = null;
      this.allProducts = [];
      this.amount = 1;
      this.$emit("cancelAnonymousSale");
    },
    getSalePrice(description) {
      let totalPrice = 0;
      this.allProducts.forEach((product) => {
        if (description === product.description) {
          totalPrice = this.amount * product.sale_price;
        }
      });
      return totalPrice;
    },
  },
};
</script>
