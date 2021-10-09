<template>
  <div>
    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-left">Descripción</th>
            <th class="text-left">Unidades</th>
            <th class="text-left">Precio compra</th>
            <th class="text-left">Precio Venta</th>
            <th class="text-left">Fecha de Actualización</th>
            <th class="text-left">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.name">
            <td style="pading: 10px">{{ product.description }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.costPrice }}</td>
            <td>{{ product.salePrice }}</td>
            <td>{{ product.dateUpdate }}</td>
            <td><v-btn class="primary" large>Actualizar</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "ListProductsFinded",
  props: ["products"],
  methods: {},
};
</script>
