<template>
  <MainView />
</template>

<script>
import MainView from "../components/MainView";

export default {
  name: "Home",

  components: {
    MainView,
  },
  mounted() {
    if (localStorage.getItem("type") === "0") {
      this.$router.push("/registersales");
    }
    if (localStorage.getItem("type") === "1") {
      this.$router.push("/registerproducts");
    }
    if (localStorage.getItem("type") === "2") {
      this.$router.push("/addproducts");
    }
  },
};
</script>
