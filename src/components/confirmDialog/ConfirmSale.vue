<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="550">
      <v-card>
        <v-card-title class="text-h5">
          Esta seguro que desea terminar la compra?
        </v-card-title>
        <v-card-text
          >Una vez acepte ya no podra agregar mas productos a esa
          factura</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="danger" color="red darken-1" text @click="cancel()">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="finish()"> Aceptar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ConfirmSale",
  props: ["dialog"],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    finish() {
      this.$emit("acept");
    },
  },
};
</script>
