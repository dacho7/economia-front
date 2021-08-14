<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700">
      <template>
        <v-btn color="primary" dark> Venta No Registrada </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Buscar un producto o Agregar una venta Anonima.
        </v-card-title>
        <v-card-text>
          <h3>Ingrese Descripción</h3>
          <v-row>
            <v-col>
              <v-text-field
                v-model="product"
                label="descripción"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <h2>{{ productResult }}</h2>
            </v-col>
          </v-row>
          <v-row v-if="product">
            <v-col>
              <v-text-field type="number" label="cantidad"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field type="number" label="Total"></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!product">
            <v-col>
              <v-text-field label="Total"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="sendFather">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AnonymousSale",
  props: ["dialog"],
  data() {
    return {
      product: "",
    };
  },
  computed: {
    productResult() {
      if (this.product) {
        return this.product;
      }
      return "Sin producto";
    },
  },
  methods: {
    sendFather() {
      this.$emit("activate", {
        name: true,
        fal: false,
      });
    },
  },
};
</script>
