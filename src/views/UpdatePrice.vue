<template>
  <v-container>
    <template>
      <div>
        <v-row class="text-center">
          <v-col class="mt-5">
            <h1>Cambiar Precios</h1>
          </v-col>
        </v-row>
      </div>
    </template>

    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Producto</th>
              <th class="text-left">Introducir Nuevo Precio</th>
              <th class="text-left">Precio Unitario</th>
              <th class="text-left">Ganancia</th>
              <th class="text-left">Porcentaje de Ganancia</th>
              <th class="text-left">Cantidad de productos</th>
              <th class="text-left">Fecha de Vencimiento</th>
              <th class="text-left">Aceptar Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "UpdatePrice",
  data() {
    return {
      products: [],
    };
  },
};
</script>
