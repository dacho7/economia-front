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
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-btn @click="registerProduct()" class="primary"
        >Registrar Producto</v-btn
      >
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
      // code: "81231321",
      // value: "",
      // description: "",
      // costPrice: "",
      // salePrice: "",
      // quantity: 1,
      // typesSelection: ["Grano", "Aseo y Limpieza"],
      // type: "",
      // expireDate: "",

      code: "",
      description: "Cuchilla Gillete 3 hoja",
      costPrice: "3200",
      salePrice: "3600",
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
      ],
      type: "",
      expireDate: "",
    };
  },
  methods: {
    registerProduct() {
      registerProduct(
        this.description,
        this.costPrice,
        this.salePrice,
        this.quantity,
        this.type,
        this.expireDate
      )
        .then((result) => {
          this.product = result.data.data;
          this.code = result.data.data.code;
          console.log(typeof this.code);
          // this.cleanForm();
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
