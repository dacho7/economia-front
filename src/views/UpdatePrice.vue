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

    <v-card>
      <v-card-title>
        <h2>Productos Recibidos recientemente</h2>
      </v-card-title>
      <template>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Producto</th>
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
                  <v-row>
                    <v-col>
                      <v-btn class="primary">Actualizar</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn class="secondary">Ignorar</v-btn>
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </tbody>
            <h3 v-if="products.length == 0">
              No se han recibido productos Recientemente
            </h3>
          </template>
        </v-simple-table>
      </template>
    </v-card>
    <br />
    <v-card>
      <v-card-title>
        <h2>Buscar Productos</h2>
      </v-card-title>
      <v-card-text>
        <v-container class="m-5">
          <v-text-field
            @input="findByDescription()"
            v-model="description"
            label="Buscar Por Descripción"
          ></v-text-field>
          <v-text-field
            label="Buscar Por Fecha de llegada"
            type="date"
          ></v-text-field>
          <v-text-field label="Buscar Por Código"></v-text-field>
        </v-container>
        <ListAllProducts :products="productsFinded" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  FINDPRODUCTBYSTATE,
  FINDPRODUCTSBYDESCRIPTION,
} from "../services/products";

import ListAllProducts from "../components/updateproducts/ListAllProducts.vue";

export default {
  name: "UpdatePrice",
  data() {
    return {
      products: [],
      productsFinded: [],
      newPrice: null,
      activePicker: null,
      dateDatePicker: null,
      description: null,
      idProduct: null,
    };
  },
  components: { ListAllProducts },
  methods: {
    listProducts() {
      FINDPRODUCTBYSTATE("WITHOUT-REVIEW")
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((e) => console.log(e));
    },
    async findByDescription() {
      if (this.description) {
        try {
          const result = await FINDPRODUCTSBYDESCRIPTION(this.description);
          if (result.data.ok) {
            this.productsFinded = result.data.data;
          }
        } catch (e) {
          console.log(e);
          this.productsFinded = [];
          this.description = "";
        }
      } else {
        this.productsFinded = [];
      }
    },
    activeDialogDescription() {
      this.dialogUpdateByDescription = true;
    },
    setId(id) {
      this.idProduct = id;
    },
  },
  created() {
    this.listProducts();
  },
};
</script>
