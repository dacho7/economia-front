<template>
  <v-card class="pb-4 pt-4">
    <v-row>
      <v-col class="text-center">
        <h1>Editar Producto</h1>
      </v-col>
    </v-row>
    <v-card-text>
      <v-card color="pb-4 pt-4">
        <v-card-title>
          <h2>Producto - {{ product.description }}</h2>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th><h2>Propiedad</h2></th>
                  <th><h2>Actualizar</h2></th>
                </tr>
              </thead>
              <br />
              <br />
              <tbody>
                <tr>
                  <td>
                    <v-text-field
                      label="Descripción"
                      v-model="description"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      :disabled="product.description == description"
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Precio de Compra"
                          v-model="cost_price"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field label="Ganancia"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Porcentaje de Ganancia"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td>
                    <v-btn
                      :disabled="product.cost_price == cost_price"
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>

                <tr>
                  <td>
                    <v-text-field
                      label="Precio De venta"
                      v-model="sale_price"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      :disabled="product.sale_price == sale_price"
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-text-field
                      label="Cantidad"
                      v-model="quantity"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      :disabled="product.quantity == quantity"
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-text-field
                      label="Fecha de Expiracón"
                      type="date"
                      v-model="expire_date"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      :disabled="product.expire_date == expire_date"
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="pt-5 pb-5 white-text">
          <v-spacer></v-spacer>
          <v-btn large class="col-4">Cancelar</v-btn>
          <v-spacer></v-spacer>

          <v-btn large class="col-4 success">
            <router-link to="/"> Finalizar </router-link>
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { FINDPRODUCTBYID } from "../../services/products";
export default {
  name: "ProductAllFields",
  data() {
    return {
      product: null,
      description: null,
      cost_price: null,
      sale_price: null,
      quantity: null,
      expire_date: null,
    };
  },
  methods: {},
  async created() {
    try {
      const result = await FINDPRODUCTBYID(this.$route.params.id);
      this.product = result.data.data;
      this.description = this.product.description;
      this.cost_price = this.product.cost_price;
      this.sale_price = this.product.sale_price;
      this.quantity = this.product.quantity;
      this.expire_date = this.product.expire_date;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
