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
                      <UpdateProduct :id="item.idProduct" />
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
        <h2>Actualizar Precios de otros Productos</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <h3>Buscar Productos</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <UpdateByDescription />
          </v-col>
          <v-col>
            <v-btn class="warning" block x-large
              >Buscar Por Fecha de Llegada</v-btn
            >
          </v-col>
          <v-col>
            <v-btn class="warning" block x-large>Buscar Por Código</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title></v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import {
  FINDPRODUCTBYSTATE,
  FINDPRODUCTSBYDESCRIPTION,
} from "../services/products";
import UpdateByDescription from "../components/updateproducts/UpdateByDescription.vue";
import UpdateProduct from "../components/updateproducts/UpdateProduct.vue";

export default {
  name: "UpdatePrice",
  data() {
    return {
      products: [],
      newPrice: null,
      activePicker: null,
      dateDatePicker: null,
      description: "",
      idProduct: null,
    };
  },
  components: {
    UpdateByDescription,
    UpdateProduct,
  },
  methods: {
    listProducts() {
      FINDPRODUCTBYSTATE("WITHOUT-REVIEW")
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((e) => console.log(e));
    },
    findByDescription() {
      if (this.description.length >= 3)
        FINDPRODUCTSBYDESCRIPTION(this.description).then((productsDB) => {
          let prod = [];
          if (productsDB.data.ok) {
            console.log(productsDB);
            productsDB.data.data.forEach((product) => {
              prod.push(product);
            });
            this.products = prod;
          } else {
            this.products = [];
          }
        });
      if (this.description.trim().length < 3) {
        this.products = [];
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
