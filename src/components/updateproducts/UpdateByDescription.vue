<template>
  <v-row class="container">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="warning" block x-large v-bind="attrs" v-on="on">
          Buscar Por Descripción
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="warning  ">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Buscar por Descripción</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <h1>Ingrese descripción del producto</h1>
          <v-text-field
            label="Ingrese Descripción"
            v-model="description"
            @input="findProduct()"
          ></v-text-field>
          <ListProductsFinded :products="products"></ListProductsFinded>
        </v-container>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { FINDPRODUCTSBYDESCRIPTION } from "../../services/products";
import ListProductsFinded from "./ListProductsFinded.vue";
export default {
  name: "UpdateByDescription",
  data() {
    return {
      dialog: false,
      description: "",
      products: [],
    };
  },
  components: {
    ListProductsFinded,
  },
  methods: {
    async findProduct() {
      try {
        const result = await FINDPRODUCTSBYDESCRIPTION(this.description);
        if (await result.data.ok) {
          this.products = result.data.data;
        } else {
          this.products = [];
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
