<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="650">
      <v-card>
        <v-card-title class="text-h5">
          Esta seguro que desea Registrar este producto?
        </v-card-title>
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
  name: "ConfirmRegisterProduct",
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
