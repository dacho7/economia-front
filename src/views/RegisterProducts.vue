<template>
  <v-form>
    <v-container mt-10>
      <h1 align="center">Registrar productos</h1>
    </v-container>

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
            v-model="costPrice"
            label="Precio De compra"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="salePrice"
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
            v-model="expireDate"
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
        :disabled="!description || !costPrice || !salePrice || !type"
        @click="registerProduct()"
        class="primary"
        >Registrar Producto</v-btn
      >
      <!-- || !description || !costPrice || !salePrice -->
      <Barcode :code="code" />
    </v-container>
  </v-form>
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
      costPrice: 0,
      salePrice: 0,
      quantity: 1,
      typesSelection: [
        "Granos",
        "Aseo y Limpieza",
        "Enlatados",
        "Frituras",
        "Agricultura",
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
      ],
      type: "",
      expireDate: "",
      noexpire: false,
    };
  },
  methods: {
    registerProduct() {
      console.log(this.noexpire);
      console.log(this.expireDate);
      if (this.noexpire) {
        this.expireDate = "2100-01-01";
      }
      registerProduct(
        this.description,
        this.costPrice,
        this.salePrice,
        this.quantity,
        this.type,
        this.expireDate
      )
        .then((result) => {
          console.log(result);
          this.product = result.data.data;
          this.code = result.data.data.code;
          console.log(typeof this.code);
          this.cleanForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cleanForm() {
      this.product = null;
      this.code = "";
      this.description = "";
      this.costPrice = "";
      this.salePrice = "";
      this.quantity = 1;
      this.type = "";
      this.expireDate = "";
    },
  },
};
</script>
