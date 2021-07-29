<template>
  <div>
    <barcode v-bind:value="code"></barcode>
  </div>
</template>

<script>
import VueBarcode from "vue-barcode";
export default {
  name: "Barcode",
  props: ["code"],
  components: {
    barcode: VueBarcode,
  },
};
</script>
