<template>
  <v-row class="container">
    <v-dialog
      transition="dialog-bottom-transition"
      hide-overlay
      fullscreen
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">Actualizar</v-btn>
      </template>

      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Actualizar</v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">{{ id }}Hello world!</div>
          </v-card-text>
          <v-btn text @click="closeDialog()">Close</v-btn>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "UpdateProduct",
  props: ["id"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    findProduct() {},
  },
  created: {},
};
</script>
