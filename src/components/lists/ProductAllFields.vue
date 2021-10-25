<template>
  <v-card class="pb-4 pt-4" v-if="product">
    <v-row>
      <v-col class="text-center">
        <h1>Editar Datos de un Producto</h1>
      </v-col>
    </v-row>
    <v-card-text>
      <v-card color="pb-4 pt-4">
        <v-card-title>
          <h2>Producto - {{ product.description | capitalize }}</h2>
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
                        <v-text-field
                          disabled
                          v-model="utility"
                          label="Ganancia Neta"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          disabled
                          v-model="utilityporcent"
                          label="Porcentaje de Ganancia"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td>
                    <v-btn
                      :disabled="
                        product.cost_price == cost_price || cost_price < 1
                      "
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
                      :disabled="
                        product.sale_price == sale_price ||
                        sale_price < cost_price
                      "
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-text-field
                      label="Cantidad de Productos En Inventario"
                      v-model="quantity"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      :disabled="product.quantity == quantity || quantity < 0"
                      class="warning"
                    >
                      Actualizar
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td v-if="disableexpiredateinput">
                    <h3>No expira</h3>
                  </td>
                  <td v-else>
                    <v-text-field
                      label="Fecha de Expiracón"
                      type="date"
                      v-model="expire_date"
                      @input="activateUpdateDateExpire()"
                      :disabled="disableexpiredateinput"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn :disabled="disableexpiredatebutton" class="warning">
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
          <v-btn large class="col-4 success" @click="redirectUpdateProducts()"
            >Finalizar</v-btn
          >

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
  <v-card v-else>
    <v-row class="text-center">
      <v-col>
        <h1>No existe ese producto</h1>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { FINDPRODUCTBYID } from "../../services/products";
export default {
  name: "ProductAllFields",
  data() {
    return {
      product: null,
      productAux: null,
      description: null,
      cost_price: null,
      sale_price: null,
      quantity: null,
      expire_date: null,
      disableexpiredatebutton: true,
      disableexpiredateinput: true,
    };
  },
  computed: {
    utility() {
      return this.sale_price - this.cost_price;
    },
    utilityporcent() {
      return (
        100 * ((this.sale_price - this.cost_price) / this.sale_price) + " %"
      );
    },
  },
  methods: {
    redirectUpdateProducts() {
      this.$router.push("/updateprice");
    },
    activateUpdateDateExpire() {
      this.disableexpiredatebutton = false;
    },
  },
  async created() {
    try {
      const result = await FINDPRODUCTBYID(this.$route.params.id);
      this.product = result.data.data;
      this.productAux = result.data.data;
      this.description = this.product.description;
      this.cost_price = this.product.cost_price;
      this.sale_price = this.product.sale_price;
      this.quantity = this.product.quantity;
      this.expire_date = this.product.expire_date.substr(0, 10);
      if (this.product.expire_date.substr(0, 10) != "2100-01-01") {
        this.disableexpiredateinput = false;
        this.expire_date = this.product.expire_date.substr(0, 10);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
