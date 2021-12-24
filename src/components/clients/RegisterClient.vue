<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="warning white--text">
          <span class="text-h5">Registar Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="document"
                  label="Número de Documento (Cédula)*"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="names"
                  label="Nombres*"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="surnames"
                  label="Apellidos*"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  label="Número de Celular*"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addres"
                  label="Dirección*"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                ></v-text-field>
              </v-col>
            </v-row>
            <span>Nota: evite tildes en los nombres</span>
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
            @click="confirm = true"
            :disabled="validateRegiste"
          >
            Registrar
          </v-btn>
        </v-card-actions>
        <v-dialog v-model="confirm" persistent max-width="500">
          <v-card>
            <v-card-title class="text-h5">
              Esta Seguro de Registrar este cliente?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="btn warning"
                @click="confirm = false"
              >
                Cancelar
              </v-btn>
              <v-btn class="btn success" text @click="register()">
                Registrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { REGISTERCLIENT } from '../../services/users';

export default {
  name: 'RegisterClient',
  props: ['dialog'],
  data() {
    return {
      document: '',
      names: '',
      surnames: '',
      addres: '',
      phone: '',
      email: '',
      confirm: false,
    };
  },
  computed: {
    validateRegiste() {
      if (
        !this.document ||
        !this.names ||
        !this.surnames ||
        !this.addres ||
        !this.phone ||
        this.document.length < 7
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    register() {
      REGISTERCLIENT(
        this.document,
        this.names,
        this.surnames,
        this.addres,
        this.phone,
        this.email,
      )
        .then((result) => {
          if (result.data.ok) {
            this.$emit('acept', result.data.data);
            alert('Usuario registrado con exito');
            this.clean();
          } else {
            alert('Cedula ya registrada');
            this.confirm = false;
          }
        })
        .catch((e) => console.log(e));
    },
    clean() {
      this.document = '';
      this.names = '';
      this.surnames = '';
      this.addres = '';
      this.phone = '';
      this.confirm = false;
      this.email = '';
    },
  },
};
</script>
