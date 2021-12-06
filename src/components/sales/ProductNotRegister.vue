<template>
  <v-row justify="center" align="center">
    <v-dialog v-model="dialog" persistent max-width="700">
      <template>
        <v-btn color="primary" dark
          >Agregar Venta Con producto sin registro</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Ingrese Producto o Valor final
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                label="Descripción del producto"
                v-model="description"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                type="number"
                label="Cantidad"
                v-model="amount"
                min="1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                class="centered-input"
                autofocus
                v-model="total"
                type="number"
                label="Total"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel()">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="acept()"
            :disabled="amount < 1 || total < 100"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ProductNotRegister',
  props: ['dialog'],
  data() {
    return {
      amount: 1,
      description: null,
      total: null,
    };
  },

  methods: {
    acept() {
      const newSale = {
        quantitiy: this.amount,
        total: this.total,
        description: this.description,
      };
      if (!newSale.description) newSale.description = 'Sin Registro';
      this.clean();
      this.$emit('acept', newSale);
    },
    cancel() {
      this.amount = 1;
      this.total = null;
      this.$emit('cancel');
    },

    clean() {
      this.amount = 1;
      this.description = null;
      this.total = null;
    },
  },
};
</script>
