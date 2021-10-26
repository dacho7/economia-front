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
                label="Digite Descripcion del producto"
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
                :label="quantityFinded"
                @input="setDate()"
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
                  <h4>Cantidad De unidades</h4>
                </v-col>
                <v-col>
                  <h4>Valor Total</h4>
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
                    label="Cantidad de unidades recibidas"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :disabled="!product"
                    type="number"
                    v-model="total"
                    label="Ingrese El valor total Pagado"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field disabled v-model="getUnitPrice"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    type="date"
                    v-model="expire_date"
                    :disabled="!expire_date"
                    :label="msgExpireDate"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row class="text-center">
                <v-col>
                  <v-btn
                    large
                    :disabled="
                      !product || !amount || !total || total < 0 || amount < 1
                    "
                    @click="showConfirmReceiveOrder = true"
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
    <ConfirmReceiveOrder
      :dialog="showConfirmReceiveOrder"
      @cancel="showConfirmReceiveOrder = false"
      @acept="finish()"
    />
  </v-container>
</template>

<script>
import {
  findProductByDescription,
  findProductByCode,
  updateProduct,
} from "../services/sales";
import ConfirmReceiveOrder from "../components/confirmDialog/ConfirmReceiveOrder.vue";

export default {
  name: "ReceiveOrder",
  components: {
    ConfirmReceiveOrder,
  },
  data() {
    return {
      product: null,
      code: "",
      id: "",
      description: "",
      amount: 12,
      total: null,
      expire_date: null,
      products: [],
      textfind: "Sin busqueda",
      msgExpireDate: "",
      showConfirmReceiveOrder: false,
      quatityProductsFinded: 0,
    };
  },
  computed: {
    getUnitPrice() {
      return this.total / this.amount;
    },
    quantityFinded() {
      if (this.quatityProductsFinded > 1 || this.quatityProductsFinded == 0) {
        return this.quatityProductsFinded + " Productos Encontrados";
      } else {
        return this.quatityProductsFinded + " Producto Encontrado";
      }
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
          this.quatityProductsFinded = prod.length;
        } else {
          this.products = [];
          this.id = "";
          this.quatityProductsFinded = 0;
        }
      });
    },
    findByCode() {
      findProductByCode(this.code)
        .then((result) => {
          if (result.data.ok) {
            this.product = result.data.data;
            this.textfind = `${this.product.description} | ${this.product.quantity} unidades |  precio unitario $ ${this.product.cost_price} | Fecha de Vencimimiento `;
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
          this.textfind = `${this.product.description} | ${this.product.quantity} unidades |  precio unitario $ ${this.product.cost_price} | Fecha de Vencimimiento `;
        }
      });
    },
    setDate() {
      if (this.product.expire_date == "2100-01-01T00:00:00.000Z") {
        this.msgExpireDate = "No vence";
        this.expire_date = null;
      } else {
        if (this.product.expire_date) {
          this.expire_date = this.product.expire_date.substr(0, 10);
          this.msgExpireDate = "";
        } else {
          this.msgExpireDate = "No vence";
          this.expire_date = null;
        }
      }
    },
    finish() {
      const unitPrice =
        (parseInt(this.product.quantity) * parseFloat(this.product.cost_price) +
          parseFloat(this.total)) /
        (parseInt(this.product.quantity) + parseInt(this.amount));
      const totalUnits =
        parseInt(this.amount) + parseInt(this.product.quantity);
      updateProduct(
        this.product.id_product,
        unitPrice,
        this.product.sale_price,
        totalUnits,
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
      this.showConfirmReceiveOrder = false;
    },
  },
};
</script>
