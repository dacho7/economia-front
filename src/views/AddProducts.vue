<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-5">
        <h1>Adicionar Inventario</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Buscar por Descripción</h2>
        <v-autocomplete
          @keypress.enter="findByDescription"
          v-moldel="description"
          :items="products"
        >
        </v-autocomplete>
      </v-col>
      <v-col>
        <h2>Buscar por Código</h2>
        <v-text-field label="Código"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center mt-4 mb-4">
        <h2>{{ product }}</h2>
      </v-col>
      <v-container>
        <v-simple-table>
          <thead>
            <th><h4>Cantidad</h4></th>
            <th><h4>Total</h4></th>
            <th><h4>Precio Unitario</h4></th>
          </thead>
          <tbody>
            <td width="20px">
              <v-text-field v-model="amount"></v-text-field>
            </td>
            <td width="180px">
              <v-text-field disabled v-model="total"></v-text-field>
            </td>
            <td width="160px">
              <v-text-field disabled v-model="unitPrice"></v-text-field>
            </td>
          </tbody>
        </v-simple-table>

        <v-row class="text-center">
          <v-col>
            <v-btn class="primary">Terminar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    {{ products }}
  </v-container>
</template>

<script>
import { findProductByDescription } from "../services/sales";
export default {
  name: "AddProducts",
  data() {
    return {
      product: "Papa Margarita 120g",
      description: "",
      amount: 10,
      total: 10000,
      unitPrice: 1000,
      products: [],
    };
  },
  methods: {
    findByDescription() {
      findProductByDescription(this.description).then((productsDB) => {
        let prod = [];
        productsDB.data.data.forEach((product) => {
          prod.push(product.description);
        });
        this.products = prod;
      });
    },
  },
};
</script>
