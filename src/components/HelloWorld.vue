<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenido Autoservicio La Economia
        </h1>

        <p class="subheading font-weight-regular">
          Si tiene algun problema contactese con soporte
          <br />Numero de Contacto
          <a
            href="https://api.whatsapp.com/send?phone=573193983994"
            target="_blank"
            >319 398 3994</a
          >
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Servicios</h2>
        <br />

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    importantLinks: [
      {
        text: "Registro de Ventas",
        href: "localhost:8081/registersales",
      },
      {
        text: "Registro De Productos",
        href: "localhost:8081/registerproducts",
      },
      {
        text: "Recibir Pedido",
        href: "localhost:8081/addproducts",
      },
    ],
  }),
};
</script>
