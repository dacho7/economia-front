<template>
  <div id="printJS-form">
    <div class="container">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Autoservicio La
      Economia <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nit:
      432432 <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 Sector
      Barrio Libertad
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Celular
      3147581354
      <div>
        <table>
          <tr>
            <th>Detalle</th>
            <th>Precio</th>
          </tr>
          <tr v-for="(item, index) of products" :key="index">
            <td v-if="item.amount === 1">{{ item.description }}</td>
            <td v-if="item.amount > 1">
              {{ item.amount }} {{ item.description }}
            </td>
            <td>{{ item.subtotal }}</td>
          </tr>
        </table>
        Total: {{ total }}
      </div>
      <div v-if="client">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cliente:
        {{ client }}
      </div>
      <br />
      <br />
      <br />
      .{{ products }}
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceToPrint",
  props: ["client", "products"],
  data() {
    return {
      total: 3800,
    };
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
