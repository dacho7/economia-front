<template>
  <v-simple-table class="dark">
    <template>
      <thead>
        <tr>
          <th class="text-left">Producto</th>
          <th class="text-left">Precio Unitario</th>
          <th class="text-left">Ganancia</th>
          <th class="text-left">Porcentaje de Ganancia</th>
          <th class="text-left">Cantidad de productos</th>
          <th class="text-left">Fecha de Vencimiento</th>
          <th class="text-left">Actualizar Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ item.description }}</td>
          <td>{{ Math.round(item.costPrice) }}</td>
          <td>{{ Math.round(item.salePrice - item.costPrice) }}</td>
          <td>
            {{
              `
                  ${Math.round(
                    ((item.salePrice - item.costPrice) / item.costPrice) * 100
                  )}%`
            }}
          </td>
          <td>{{ item.quantity }}</td>

          <td v-if="!item.expireDate">-</td>
          <td v-else-if="item.expireDate == '2100-01-01T00:00:00.000Z'">
            No Vence
          </td>
          <td v-else-if="item.expireDate != '2100-01-01T00:00:00.000Z'">
            {{ item.expireDate }}
          </td>
          <td>
            <v-row>
              <v-col>
                <v-btn class="primary">Actualizar</v-btn>
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
      <h3 v-if="products.length == 0">No se han Encontrado Productos</h3>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "ListAllProducts",
  props: ["products"],
};
</script>
