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
                @input="findByDescription()"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-if="allProducts.length >= 1"
                :items="showAllProducts"
                label="Seleccione Producto"
                v-model="desc"
                @input="selectProduct()"
              ></v-select>
              <h3 v-else>No se encontraron productos</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <h2>{{ productResult }}</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="quantity"
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="clean">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="register()">
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { findProductByDescription } from '../../services/sales';

export default {
  name: 'FindProductRegister',
  props: ['dialog'],
  data() {
    return {
      description: '',
      desc: '',
      quantity: 1,
      product: {},
      allProducts: [],
    };
  },
  computed: {
    productResult() {
      if (this.product.description) {
        return this.product.description;
      }
      return 'Sin Descripción';
    },
    showAllProducts() {
      const products = [];
      this.allProducts.forEach((element) => {
        products.push(element.description);
      });
      return products;
    },
    totalwithProduct() {
      if (this.product.description) {
        return this.product.sale_price * this.quantity;
      }
      return '';
    },
  },
  methods: {
    findByDescription() {
      findProductByDescription(this.description).then(
        (productsDB) => {
          const prod = [];
          if (productsDB.data.ok) {
            productsDB.data.data.forEach((product) => {
              prod.push(product);
            });
            this.allProducts = prod;
          } else {
            this.allProducts = [];
            this.id = '';
          }
        },
      );
    },
    selectProduct() {
      this.allProducts.forEach((product) => {
        if (this.desc === product.description) {
          this.product = product;
        }
      });
    },
    register() {
      const newSale = {
        mount: this.quantity,
        code: this.product.code,
      };
      this.$emit('aceptAnonymousSale', newSale);
      this.clean();
    },
    clean() {
      this.description = '';
      this.product = {};
      this.allProducts = [];
      this.quantity = 1;
      this.$emit('cancelAnonymousSale');
    },
  },
};
</script>
