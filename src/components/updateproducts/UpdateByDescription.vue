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
        <v-text-field label="Ingrese Descripción"></v-text-field>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "UpdateByDescription",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
