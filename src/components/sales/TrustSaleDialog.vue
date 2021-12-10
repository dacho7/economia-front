<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="green white--text">
          <span class="text-h5">Registar Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="documentClient"
                  label="Número de Cuenta (Cédula)*"
                  @input="findClient()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  disabled
                  v-model="showNames"
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
            @click="confirm = true"
            :disabled="!client"
          >
            Fiar Compra
          </v-btn>
        </v-card-actions>
        <v-dialog v-model="confirm" persistent max-width="500">
          <v-card>
            <v-card-title class="text-h5">
              Esta Seguro de Fiar esta compra a {{ showNames }} de
              {{ addres }}, valor: {{ mount }}?
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
              <v-btn
                class="btn success"
                text
                @click="registerTrust()"
              >
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
import { CREATEACCOUNT, FINDACCOUNT } from '../../services/account';
import { FINDCLIENT } from '../../services/users';

export default {
  name: 'TrustSaleDialog',
  props: ['dialog', 'mount'],
  data() {
    return {
      documentClient: null,
      client: null,
      confirm: false,
    };
  },
  computed: {
    showNames() {
      if (!this.client) {
        return 'Sin resultados';
      }
      return this.client.names + ' ' + this.client.surnames;
    },
    addres() {
      if (!this.client) {
        return 'Sin resultados';
      }
      return this.client.addres;
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    findClient() {
      if (this.documentClient.length > 6) {
        FINDCLIENT(this.documentClient)
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
    registerTrust() {
      FINDACCOUNT(this.client.document)
        .then((result) => {
          if (result.data.ok) {
            console.log('existe cuenta');
            this.confirm = false;
            this.registerMovement(this.mount);
          } else {
            CREATEACCOUNT(this.client.document).then((result2) => {
              if (result2.data.ok) {
                console.log('se creo cuenta');
                this.registerMovement(this.mount);
              } else {
                alert(
                  'algo sucedio comunicarse con soporte 3193983994',
                );
              }
            });
          }
        })
        .catch((e) => console.log(e));
    },
    registerMovement() {
      alert('Registro exitoso de fio');
      console.log('registro exitoso de fio');
      this.clean();
    },
    clean() {
      this.documentClient = null;
      this.client = null;
      this.confirm = false;
    },
  },
};
</script>
