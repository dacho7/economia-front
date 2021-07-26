<template>
  <hello-world />
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
  mounted() {
    if (localStorage.getItem("type") === "0") {
      this.$router.push("/registersales");
    }
    if (localStorage.getItem("type") === "1") {
      this.$router.push("/registerproducts");
    }
  },
};
</script>
