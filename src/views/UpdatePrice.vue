<template>
  <v-container>
    <template>
      <div>
        <v-row class="text-center">
          <v-col>
            <h1>Cambiar Precios</h1>
          </v-col>
        </v-row>
      </div>
    </template>
    <br />
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Producto</th>
              <th class="text-left">Introducir Nuevo Precio</th>
              <th class="text-left">Precio Unitario</th>
              <th class="text-left">Ganancia</th>
              <th class="text-left">Porcentaje de Ganancia</th>
              <th class="text-left">Cantidad de productos</th>
              <th class="text-left">Fecha de Vencimiento</th>
              <th class="text-left">Aceptar Nuevo Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td>{{ item.description }}</td>
              <td>
                <v-text-field
                  v-model="newPrice"
                  type="number"
                  :min="item.costPrice"
                ></v-text-field>
              </td>
              <td>{{ Math.round(item.costPrice) }}</td>
              <td>{{ Math.round(item.salePrice - item.costPrice) }}</td>
              <td>
                {{
                  `
                  ${Math.round(
                    ((item.salePrice - item.costPrice) / item.costPrice) * 100
                  )}%`
                }}
              </td>
              <td>{{ item.quantity }}</td>

              <td v-if="item.expireDate == '2100-01-01T00:00:00.000Z'">
                No Vence
              </td>
              <td v-if="item.expireDate != '2100-01-01T00:00:00.000Z'">
                {{ item.expireDate.substring(0, 10) }}
              </td>

              <td>
                <v-btn
                  :disabled="!newPrice || newPrice < item.costPrice"
                  class="success"
                  >Aceptar</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </v-container>
</template>

<script>
import { FINDPRODUCTBYSTATE } from "../services/products";
export default {
  name: "UpdatePrice",
  data() {
    return {
      products: [],
      newPrice: null,
    };
  },
  methods: {
    listProducts() {
      FINDPRODUCTBYSTATE("WITHOUT-REVIEW").then((res) => {
        this.products = res.data.data;
      });
    },
  },
  created() {
    this.listProducts();
  },
};
</script>
