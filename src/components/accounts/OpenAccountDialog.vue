<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="green white--text">
        <span class="text-h5">Create Account</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="document"
                label="Número de Documento (Cédula)*"
                @input="findClient()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="showNames"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel()">
          Cancelar
        </v-btn>
        <v-btn
          color="green "
          text
          @click="register()"
          :disabled="!client"
        >
          Abrir Cuenta
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CREATEACCOUNT } from '../../services/account';
import { FINDCLIENT } from '../../services/users';

export default {
  name: 'OpenAccountDialog',
  props: ['dialog'],
  data() {
    return {
      document: null,
      client: null,
    };
  },
  computed: {
    showNames() {
      if (!this.client) {
        return 'Sin resultados';
      }
      return this.client.names + this.client.surnames;
    },
  },
  methods: {
    findClient() {
      if (this.document.length > 6) {
        FINDCLIENT(this.document)
          .then((result) => {
            if (result.data.ok) {
              this.client = result.data.data;
            } else {
              this.client = null;
            }
          })
          .catch((e) => console.log(e));
      }
    },
    cancel() {
      this.$emit('cancel');
    },
    register() {
      CREATEACCOUNT(this.client.document)
        .then((result) => {
          if (result.data.ok) {
            this.$emit('cancel');
            alert('Cuenta Registrada con exito');
            this.document = null;
            this.client = null;
          } else {
            alert('La cuenta ya existe');
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
