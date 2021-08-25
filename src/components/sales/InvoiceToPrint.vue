<template>
  <div id="printJS-form">
    <div class="container">
      <br />
      <br />
      <h1>Autoservicio La Economia</h1>
      <h3>Nit: 432432</h3>
      <h3>3 Sector Barrio Libertad</h3>
    </div>
    <v-container> v-simple </v-container>
  </div>
</template>

<script>
export default {
  name: "InvoiceToPrint",
  props: ["products"],
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
