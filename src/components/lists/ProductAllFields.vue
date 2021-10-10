<template>
  <div>editar elemento {{ product }}</div>
</template>

<script>
import { FINDPRODUCTBYID } from "../../services/products";
export default {
  name: "ProductAllFields",
  data() {
    return {
      description: "",
      product: null,
    };
  },
  methods: {},
  async created() {
    try {
      const result = await FINDPRODUCTBYID(3213);
      this.product = result.data.data;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
