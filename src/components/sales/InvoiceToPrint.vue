<template>
  <div id="printJS-form" class="">
    <div>
      <!-- <h1>Autoservicio La Economia</h1>
      <h2>Nit:432432</h2> -->
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Autoservicio
      La Economia <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nit:
      432432 <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3
      Sector Barrio Libertad
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
            <td v-if="item.amount === 1">
              {{ item.description.substr(0, 28) | capitalize }}
            </td>
            <td v-if="item.amount > 1">
              {{ item.amount }}x {{ item.description.substr(0, 23) }}
            </td>
            <td>{{ item.subtotal | currency_2 }}</td>
          </tr>
        </table>
        <br />
        ________________________________
        <br />
        <br />
        Total:
        {{ total | currency }}
        <div v-if="client">Cliente: {{ client | capitalize }}</div>
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
  name: 'InvoiceToPrint',
  props: ['client', 'products', 'total'],
};
//something here
</script>

<style>
h3 {
  text-align: center;
  color-background: #ffff;
}
h1 {
  text-align: center;
}
h2 {
  text-align: right;
}
</style>
