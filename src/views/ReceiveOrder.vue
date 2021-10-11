<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-5">
        <h1>Recibir Entrega</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="center-text">Buscar Producto por Descripción</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          @keyup="findByDescription()"
          v-model="description"
          label="Descripcion"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-on:input="getByDescription"
          :items="products"
          v-model="id"
          item-value="id_product"
          item-text="description"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Buscar Producto por Código</h2>
        <v-text-field
          @keydown.enter="findByCode()"
          v-model="code"
          label="Código"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center mt-4 mb-4">
        <h2>{{ getBycode }}</h2>
      </v-col>
      <v-container>
        <v-simple-table>
          <thead>
            <th><h4>Cantidad</h4></th>
            <th><h4>Total</h4></th>
            <th><h4>Precio Unitario</h4></th>
            <th><h4>Fecha de Expiracion</h4></th>
          </thead>
          <tbody>
            <td width="20px">
              <v-text-field
                :disabled="!product"
                v-model="amount"
              ></v-text-field>
            </td>
            <td width="180px">
              <v-text-field
                :disabled="!product"
                type="number"
                v-model="total"
              ></v-text-field>
            </td>
            <td width="160px">
              <v-text-field disabled v-model="getUnitPrice"></v-text-field>
            </td>
            <td width="160px">
              <v-text-field type="date" v-model="expire_date"></v-text-field>
            </td>
          </tbody>
        </v-simple-table>

        <v-row class="text-center">
          <v-col>
            <v-btn
              :disabled="!product || !amount || !total || !expire_date"
              @click="finish"
              class="primary"
              >Terminar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    {{ product }}
  </v-container>
</template>

<script>
import {
  findProductByDescription,
  findProductByCode,
  updateProduct,
} from "../services/sales";
export default {
  name: "ReceiveOrder",
  data() {
    return {
      product: null,
      code: "",
      id: "",
      description: "",
      amount: 12,
      total: null,
      expire_date: "",
      products: [],
    };
  },
  computed: {
    getBycode() {
      if (this.product) {
        return `${this.product.description} | ${this.product.quantity} unidades | $ ${this.product.cost_price} precio unitario`;
      }
      return "";
    },
    getUnitPrice() {
      return this.total / this.amount;
    },
  },
  methods: {
    findByDescription() {
      if (this.description.length >= 3)
        findProductByDescription(this.description).then((productsDB) => {
          let prod = [];
          if (productsDB.data.ok) {
            productsDB.data.data.forEach((product) => {
              prod.push(product);
            });
            this.products = prod;
          } else {
            this.products = [];
            this.id = "";
          }
        });
      if (this.description.trim().length < 3) {
        this.products = [];
      }
    },
    findByCode() {
      findProductByCode(this.code).then((result) => {
        (this.description = ""), (this.products = []);
        this.product = result.data.data;
        this.code = "";
      });
    },
    getByDescription() {
      this.products.forEach((product) => {
        if (this.id == product.id_product) {
          this.product = product;
        }
      });
    },
    finish() {
      // if (this.product.expire_date == "2100-01-01") {
      //   this.expire_date = "2100-01-01";
      // }
      const unitPrice =
        (parseInt(this.product.quantity) * parseFloat(this.product.cost_price) +
          parseFloat(this.total)) /
        (parseInt(this.product.quantity) + parseInt(this.amount));
      const amount = parseInt(this.amount) + parseInt(this.product.quantity);

      updateProduct(
        this.product.id_product,
        unitPrice,
        this.product.sale_price,
        amount,
        this.expire_date,
        "WITHOUT-REVIEW"
      )
        .then(() => {
          this.clean();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clean() {
      this.product = null;
      this.code = "";
      this.id = "";
      this.description = "";
      this.amount = 12;
      this.total = null;
      this.expire_date = "";
      this.products = [];
    },
  },
};
</script>
