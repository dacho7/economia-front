<template>
  <v-dialog
    transition="dialog-bottom-transition"
    hide-overlay
    fullscreen
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">Actualizar</v-btn>
    </template>

    <template>
      <v-card>
        <v-toolbar color="primary" dark>Actualizar</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">{{ id }}Hello world!</div>
          {{ product }}
        </v-card-text>
        <v-btn text @click="closeDialog()">Close</v-btn>
        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { FINDPRODUCTBYID } from "../../services/products";
export default {
  name: "UpdateProduct",
  props: ["id"],
  data() {
    return {
      dialog: false,
      product: [],
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    findProduct() {
      FINDPRODUCTBYID(this.id)
        .then((result) => {
          this.product = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.findProduct();
  },
};
</script>
