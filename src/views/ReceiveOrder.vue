<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row class="text-center">
          <v-col class="mt-5">
            <h1>Recibir Entrega</h1>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <h2 class="center-text">Buscar Producto por Descripción</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                @input="findByDescription()"
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
                label="Seleccionar productos encontrados"
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
              <v-btn large block class="primary">{{ textfind }}</v-btn>
            </v-col>
            <v-container>
              <v-row>
                <v-col cols="2">
                  <h4>Cantidad De unidades Recibidas</h4>
                </v-col>
                <v-col>
                  <h4>Valor Total pagado por las unidades</h4>
                </v-col>
                <v-col>
                  <h4>Precio Unitario</h4>
                </v-col>
                <v-col>
                  <h4>Fecha de Expiracion</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-text-field
                    :disabled="!product"
                    v-model="amount"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :disabled="!product"
                    type="number"
                    v-model="total"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field disabled v-model="getUnitPrice"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    type="date"
                    v-model="expire_date"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row class="text-center">
                <v-col>
                  <v-btn
                    :disabled="!product || !amount || !total || !expire_date"
                    @click="finish"
                    class="primary"
                    >Terminar Registro
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
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
      textfind: "Sin busqueda",
    };
  },
  computed: {
    getUnitPrice() {
      return this.total / this.amount;
    },
  },
  methods: {
    findByDescription() {
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
    },
    findByCode() {
      findProductByCode(this.code)
        .then((result) => {
          if (result.data.ok) {
            this.product = result.data.data;
          } else {
            this.description = "";
            this.products = [];
            this.textfind = "no econtrado";
            this.product = result.data.data;
            this.code = "";
          }
        })
        .catch((e) => console.log(e));
    },
    getByDescription() {
      this.products.forEach((product) => {
        if (this.id == product.id_product) {
          this.product = product;
          this.textfind = `${this.product.description} | ${this.product.quantity} unidades | $ ${this.product.cost_price} precio unitario`;
        }
      });
    },
    finish() {
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
