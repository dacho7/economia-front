<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-5">
        <h1>Adicionar Inventario</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Buscar por Descripción</h2>
        <v-text-field label="Descripción"></v-text-field>
      </v-col>
      <v-col>
        <h2>Buscar por Código</h2>
        <v-text-field label="Código"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center mt-4 mb-4">
        <h2>{{ product }}</h2>
      </v-col>
      <v-container>
        <v-row>
          <v-col><h4>Cantidad</h4></v-col>
          <v-col><h4>Total</h4></v-col>
          <v-col><h4>Precio Unitario</h4></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field></v-text-field>
          </v-col>
          <v-col>
            <v-text-field disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col>
            <v-btn>Terminar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddProducts",
  data() {
    return {
      product: "dad",
    };
  },
};
</script>
