<template>
  <v-app>
    <v-btn color="secondary" depressed>
      <router-link to="/">
        <v-icon left> mdi-home </v-icon>
        Home
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
