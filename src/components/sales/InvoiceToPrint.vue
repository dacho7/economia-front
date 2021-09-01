<template>
  <div id="printJS-form" class="">
    <div>
      <!-- <h1>Autoservicio La Economia</h1>
      <h2>Nit:432432</h2> -->
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Autoservicio La
      Economia <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nit:
      432432 <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 Sector
      Barrio Libertad
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Celular
      3147581354 <br />________________________________
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
            <td>{{ item.subtotal | currency_2 }}</td>
          </tr>
        </table>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:
        {{ total | currency }}
        <div v-if="client">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cliente: {{ client }}
          <br />________________________________
        </div>
      </div>
      <br />
      <br />
      <br />
      .
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceToPrint",
  props: ["client", "products", "total"],
};
</script>

<style>
h3 {
  text-align: center;
}
h1 {
  text-align: center;
}
h2 {
  text-align: right;
}
</style>
