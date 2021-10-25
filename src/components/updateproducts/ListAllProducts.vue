<template>
  <v-simple-table class="dark">
    <template>
      <thead>
        <tr>
          <th class="text-left">Descripcion</th>
          <th class="text-left">Precio Unitario</th>
          <th class="text-left">Precio De Venta</th>
          <th class="text-left">Ganancia</th>
          <th class="text-left">Porcentaje de Ganancia</th>
          <th class="text-left">Cantidad de productos</th>
          <th class="text-left">Fecha de Vencimiento</th>
          <th class="text-left">Actualizar Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ item.description | capitalize }}</td>
          <td>{{ Math.round(item.cost_price) }}</td>
          <td>{{ item.sale_price }}</td>
          <td>{{ Math.round(item.sale_price - item.cost_price) }}</td>

          <td>
            {{
              `
                  ${Math.round(
                    ((item.sale_price - item.cost_price) / item.cost_price) *
                      100
                  )}%`
            }}
          </td>
          <td>{{ item.quantity }}</td>

          <td v-if="!item.expire_date">-</td>
          <td v-else-if="item.expire_date == '2100-01-01T00:00:00.000Z'">
            No Vence
          </td>
          <td v-else-if="item.expire_date != '2100-01-01T00:00:00.000Z'">
            {{ item.expire_date | dateFormat }}
          </td>
          <td>
            <v-row>
              <v-col>
                <v-btn class="primary" @click="selectProduct(item.id_product)"
                  >Actualizar</v-btn
                >
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "ListAllProducts",
  props: ["products"],
  methods: {
    selectProduct(idproduct) {
      this.$router.push({
        name: "UpdatePriceProduct",
        params: {
          id: idproduct,
        },
      });
    },
  },
};
</script>
