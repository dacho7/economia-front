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
            <th>Producto</th>
            <th>Precio</th>
          </tr>
          <tr>
            <td>3x Papas Fritas</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>coacola personal</td>
            <td>1800000</td>
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
      .
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceToPrint",
  props: ["products"],
  data() {
    return {
      client: "David Tobar",
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
