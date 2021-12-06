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
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                type="number"
                label="Cantidad"
                v-model="amount"
                @blur="validate()"
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
                @blur="validate()"
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
            :disabled="val"
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
  computed: {
    val() {
      if (this.amount >= 1 && this.total >= 100) {
        return false;
      }
      return true;
    },
  },
  methods: {
    acept() {
      const newSale = {
        quantitiy: this.amount,
        total: this.total,
        description: this.description,
      };
      if (!this.description) newSale.description = 'no Registrado';
      this.$emit('acept', newSale);
      this.clean();
    },
    cancel() {
      this.amount = 1;
      this.total = null;
      this.$emit('cancel');
    },
    validate() {
      if (this.amount < 1 || this.total < 100) {
        this.amount = 1;
        this.total = null;
      }
    },
    clean() {
      this.amount = 1;
      this.description = null;
      this.total = null;
    },
  },
};
</script>
