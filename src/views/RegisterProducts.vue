<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-container class="text-center">
          <h1 align="center">Registrar productos</h1>
        </v-container>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="description"
                label="Descripción"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cost_price"
                label="Precio De compra"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="sale_price"
                label="Precio de venta"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="quantity"
                label="Cantidad"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                label="Tipo de producto"
                v-model="type"
                :items="typesSelection"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="expire_date"
                label="Fecha de Expiración"
                type="date"
                :disabled="noexpire"
              ></v-text-field>
              <v-checkbox v-model="noexpire" label="No expira"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-btn
            :disabled="
              !description ||
              !cost_price ||
              !sale_price ||
              !type ||
              quantity < 0 ||
              cost_price < 0 ||
              sale_price < cost_price ||
              (!expire_date && !noexpire)
            "
            @click="registerProduct()"
            class="primary"
            >Registrar Producto</v-btn
          >
          <!-- || !description || !cost_price || !sale_price -->
          <Barcode :code="code" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { registerProduct } from "../services/sales";
import Barcode from "../components/Barcode";
export default {
  name: "RegisterProducts",
  components: {
    Barcode,
  },
  data() {
    return {
      product: null,
      code: "",
      description: "",
      cost_price: 0,
      sale_price: 0,
      quantity: 1,
      typesSelection: [
        "Granos",
        "Aseo y Limpieza",
        "Enlatados",
        "Frituras",
        "Variedades",
        "Verduras",
        "Dulces",
        "Lacteos",
        "Panaderia",
        "Plasticos y recipientes",
        "Galletas",
        "Papeleria",
        "Bebidas",
        "Jugueteria",
        "Licores",
        "Tecnologia",
        "Agro",
        "Utiles Escolares",
        "Bebidas",
        "Detalles",
        "Bioseguridad",
      ],
      type: "",
      expire_date: "",
      noexpire: false,
    };
  },
  methods: {
    registerProduct() {
      if (this.noexpire) {
        this.expire_date = "2100-01-01";
      }
      registerProduct(
        this.description,
        this.cost_price,
        this.sale_price,
        this.quantity,
        this.type,
        this.expire_date
      )
        .then((result) => {
          if (result.data.ok) {
            this.product = result.data.data;
            this.code = result.data.data.code;
            this.cleanForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cleanForm() {
      this.product = null;
      this.code = "";
      this.description = "";
      this.cost_price = "";
      this.sale_price = "";
      this.quantity = 1;
      this.type = "";
      this.expire_date = "";
    },
  },
};
</script>
