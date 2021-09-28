<template>
  <div>
    <v-card>
      <v-card-title>
        <h2>{{ description }}</h2>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UpdateProduct",
  data() {
    return {
      description: "Kilogramo de arroz",
    };
  },
};
</script>
