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
                FIAR
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
import { MAKEMOVEMENT } from '../../services/transactions';

export default {
  name: 'TrustSaleDialog',
  props: ['dialog', 'mount', 'invoice'],
  data() {
    return {
      documentClient: null,
      client: null,
      confirm: false,
      balanceAccount: 0,
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
      this.clean();
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
      } else {
        this.client = null;
      }
    },
    registerTrust() {
      FINDACCOUNT(this.client.document)
        .then((result) => {
          if (result.data.ok) {
            this.confirm = false;
            this.balanceAccount = result.data.data.balance;
            this.registerMovementTrust(
              result.data.data.client,
              this.mount,
            );
          } else {
            CREATEACCOUNT(this.client.document).then((result2) => {
              if (result2.data.ok) {
                this.balanceAccount = result2.data.data.balance;
                this.registerMovementTrust(
                  result2.data.data.client,
                  this.mount,
                );
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
    registerMovementTrust(account, mount) {
      MAKEMOVEMENT(
        account,
        'DEB',
        `Fio de compra ${new Date().toString().substr(4, 20)} n. ${
          this.invoice
        }`,
        mount,
      )
        .then((resMov) => {
          const total = this.balanceAccount + resMov.data.data.mount;
          alert(`Registro exitoso de fio, Total cuenta ${total}`);
          this.$emit('acept', this.client);
          this.clean();
        })
        .catch((e) => console.log(e));
    },
    clean() {
      this.documentClient = null;
      this.client = null;
      this.confirm = false;
      this.balanceAccount = 0;
    },
  },
};
</script>
