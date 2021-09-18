<template>
  <v-app>
    <v-btn color="secondary" depressed>
      <router-link to="/">
        <v-icon color="white"> mdi-home </v-icon>
      </router-link>
    </v-btn>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
