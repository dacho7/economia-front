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
                <th class="text-left">Precio De Venta</th>
                <th class="text-left">Ganancia</th>
                <th class="text-left">Porcentaje de Ganancia</th>
                <th class="text-left">Cantidad de productos</th>
                <th class="text-left">Fecha de Vencimiento</th>
                <th class="text-left">Aceptar Nuevo Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <td>{{ item.description | capitalize }}</td>
                <td>{{ Math.round(item.cost_price) }}</td>
                <td>{{ Math.round(item.sale_price) }}</td>
                <td>
                  {{ Math.round(item.sale_price - item.cost_price) }}
                </td>
                <td>
                  {{
                    `
                  ${Math.round(
                    ((item.sale_price - item.cost_price) /
                      item.cost_price) *
                      100,
                  )}%`
                  }}
                </td>
                <td>{{ item.quantity }}</td>

                <td
                  v-if="
                    item.expire_date == '2000-01-01T00:00:00.000Z'
                  "
                >
                  No Vence
                </td>
                <td
                  v-if="
                    item.expire_date != '2000-01-01T00:00:00.000Z'
                  "
                >
                  {{ item.expire_date | dateFormat }}
                </td>
                <td>
                  <v-row>
                    <v-col>
                      <v-btn
                        class="primary"
                        @click="selectProduct(item.id_product)"
                        >Actualizar</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn
                        @click="
                          dialogIgnore = true;
                          id_ElementIgnore = item.id_product;
                          descriptionDialogIgnore = `${item.description} | Precio de Compra: ${item.cost_price}  Precio de Venta: ${item.sale_price}`;
                        "
                        class="secondary"
                      >
                        Ignorar</v-btn
                      >
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </tbody>
            <h3 v-if="products.length == 0">
              No hay productos sin revisar
            </h3>
          </template>
        </v-simple-table>
      </template>
    </v-card>
    <br />
    <v-card>
      <v-card-title>
        <h2>Buscar Productos Para Actualizar Datos</h2>
      </v-card-title>
      <v-card-text>
        <v-container class="m-5">
          <v-text-field
            @input="findByDescription()"
            v-model="description"
            label="Buscar Por Descripción"
          ></v-text-field>
          <v-text-field
            disabled
            label="Buscar Por Código(No disponible)"
          ></v-text-field>
          <v-text-field
            disabled
            label="Buscar Por Fecha de llegada (No disponible)"
            type="date"
            v-model="dateDatePicker"
            @input="findByDateUpdate()"
          ></v-text-field>
          <ListProductsFinded :products="productsFinded" />
          <ConfirmDialog
            :dialog="dialogIgnore"
            :msm="'Ignorar Este producto'"
            :description="descriptionDialogIgnore"
            @cancel="dialogIgnore = false"
            @acept="
              ignorarProduct(id_ElementIgnore);
              dialogIgnore = false;
              descriptionDialogIgnore = null;
            "
          />
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  FINDPRODUCTBYSTATE,
  FINDPRODUCTSBYDESCRIPTION,
  UPDATEPRODUCTSTATE,
} from '../services/products';

import ListProductsFinded from '../components/updateproducts/ListProductsFinded.vue';
import ConfirmDialog from '../components/confirmDialog/ConfirmDialog.vue';

export default {
  name: 'UpdatePrice',
  data() {
    return {
      products: [],
      productsFinded: [],
      newPrice: null,
      activePicker: null,
      dateDatePicker: null,
      description: null,
      id_product: null,
      dialog: false,
      id_ElementIgnore: null,
      descriptionDialogIgnore: null,
      dialogIgnore: false,
    };
  },
  components: { ListProductsFinded, ConfirmDialog },
  methods: {
    listProducts() {
      FINDPRODUCTBYSTATE('WITHOUT-REVIEW')
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((e) => console.log(e));
    },
    async findByDescription() {
      if (this.description) {
        try {
          const result = await FINDPRODUCTSBYDESCRIPTION(
            this.description,
          );
          if (result.data.ok) {
            this.productsFinded = result.data.data;
          } else {
            this.productsFinded = [];
          }
        } catch (e) {
          console.log(e);
          this.productsFinded = [];
          this.description = '';
        }
      } else {
        this.productsFinded = [];
      }
    },
    async findByDateUpdate() {
      if (this.dateDatePicker) {
        console.log(typeof this.dateDatePicker);
        console.log(this.dateDatePicker);
      } else {
        this.productsFinded = [];
      }
    },
    activeDialogDescription() {
      this.dialogUpdateByDescription = true;
    },
    setId(id) {
      this.id_product = id;
    },
    selectProduct(idproduct) {
      this.$router.push({
        name: 'UpdateOnlyPrice',
        params: {
          id: idproduct,
        },
      });
    },
    ignorarProduct(idProduct) {
      UPDATEPRODUCTSTATE(idProduct, 'ACTIVE')
        .then(() => {
          this.products = this.products.filter(
            (prod) => prod.id_product != idProduct,
          );
        })
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.listProducts();
  },
};
</script>
