<template>
  <v-card class="pt-4 pb-5" v-if="product">
    <v-row>
      <v-col class="text-center">
        <h1>Actualizar Precio de un producto</h1>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-text-field
                      label="Cantidad de Productos En Inventario"
                      v-model="product.quantity"
                      disabled
                      class="mt-3"
                    ></v-text-field>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Precio de Compra"
                          v-model="product.cost_price"
                          disabled
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
                </tr>

                <tr>
                  <td v-if="disableExpireDateInput">
                    <h3>Fecha de Expiración: No expira</h3>
                  </td>
                  <td v-else>
                    <v-text-field
                      label="Fecha de Expiracón"
                      type="date"
                      v-model="newValues.date"
                      disabled
                    ></v-text-field>
                  </td>
                </tr>

                <tr>
                  <td>
                    <v-text-field
                      label="Precio De venta"
                      v-model="newValues.price"
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="pt-5 pb-5 white-text">
          <v-spacer></v-spacer>
          <v-btn large class="col-4" @click="dialogCancel = true"
            >Cancelar</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            large
            class="col-4 success"
            @click="dialogFinish = true"
            :disabled="
              newValues.price <= product.cost_price ||
              newValues.price == product.sale_price
            "
            >Finalizar</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <ConfirmDialog
      :dialog="dialogCancel"
      :msm="'Cancelar Los Cambios'"
      :description="'Puede solicitar un cambio despues'"
      @cancel="dialogCancel = false"
      @acept="redirectToBack()"
    />
    <ConfirmDialog
      :dialog="dialogFinish"
      :msm="'Finalizar Cambio Precio'"
      :description="finishText"
      @cancel="dialogFinish = false"
      @acept="finish()"
    />
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
import {
  FINDPRODUCTBYID,
  UPDATEPRICEPRODUCT,
} from '../../services/products';

import ConfirmDialog from '../confirmDialog/ConfirmDialog.vue';

export default {
  name: 'UpdateOnlyPrice',
  components: { ConfirmDialog },
  data() {
    return {
      product: null,
      newValues: {
        price: null,
      },
      disableSalePrice: true,
      disableExpireDateInput: true,
      dialogCancel: false,
      dialogFinish: false,
    };
  },
  computed: {
    utility() {
      if (this.newValues.price > this.product.cost_price) {
        return this.newValues.price - this.product.cost_price;
      }
      return '-';
    },
    utilityporcent() {
      if (this.newValues.price > this.product.cost_price) {
        return (
          (
            100 *
            ((this.newValues.price - this.product.cost_price) /
              this.newValues.price)
          )
            .toString()
            .substr(0, 5) + ' %'
        );
      }
      return '-';
    },
    finishText() {
      if (this.newValues.price != this.product.sale_price) {
        return `Precio Nuevo ${this.newValues.price}, Precio Anterior ${this.product.sale_price}`;
      }
      return 'No Se cambio el precio';
    },
  },
  methods: {
    async loadProduct() {
      try {
        const result = await FINDPRODUCTBYID(this.$route.params.id);
        this.product = result.data.data;
        this.newValues.price = this.product.sale_price;
        if (this.product.expire_date.substr(0, 10) != '2100-01-01') {
          this.disableExpireDateInput = false;
          this.newValues.date = this.product.expire_date.substr(
            0,
            10,
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    finish() {
      UPDATEPRICEPRODUCT(
        this.product.id_product,
        this.newValues.price,
      )
        .then((res) => {
          if (res.data.ok) {
            this.clean();
            this.redirectToBack();
          } else {
            alert('ingrese un valor valido');
            this.dialogFinish = false;
          }
        })
        .catch((e) => console.log(e));
    },
    redirectToBack() {
      this.$router.push('/updateprice');
    },
    clean() {
      this.product = null;
      this.newValues.price = null;
      this.disableSalePrice = true;
      this.disableExpireDateInput = true;
      this.dialogCancel = false;
      this.dialogFinish = false;
    },
  },
  mounted() {
    this.loadProduct();
  },
};
</script>
