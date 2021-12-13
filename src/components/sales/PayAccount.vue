<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" dark v-bind="attrs" v-on="on">
        Cuentas
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="secondary white--text">
        <span class="text-h5">Abonar Cuentas</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Ingrese Cuenta(Cédula)"
                required
                v-model="document"
                @input="findAccount()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                label="Datos De cuenta"
                disabled
                v-model="fullName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Total"
                v-model="total"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="mount"
                label="Cantidad a Abonar"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-btn
                @click="confirm = true"
                class="warning"
                :disabled="
                  !account || mount < 100 || mount > account.balance
                "
                >Abonar</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-label>Nuevo saldo {{ newBalance }}</v-label>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false" class="success">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="confirm" persistent max-width="700">
      <v-card>
        <v-card-title class="text-h5">
          Esta Seguro de Realizar el Abono con valor de {{ mount }}?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="confirm = false">
            Cancelar
          </v-btn>
          <v-btn class="btn success" text @click="pay()">
            Abonar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { FINDACCOUNT } from '../../services/account';
import { MAKEMOVEMENT } from '../../services/transactions';
import { FINDCLIENT } from '../../services/users';

export default {
  name: 'PayAccount',
  data() {
    return {
      dialog: false,
      confirm: false,
      document: '',
      account: null,
      client: null,
      mount: null,
    };
  },
  computed: {
    fullName() {
      if (!this.account) {
        return 'Sin resultados';
      }
      return this.client.names + ' ' + this.client.surnames;
    },
    total() {
      if (!this.account) {
        return null;
      }
      return this.account.balance;
    },
    newBalance() {
      if (
        !this.account ||
        this.mount < 100 ||
        this.mount > this.account.balance
      ) {
        return null;
      }
      return this.account.balance - this.mount;
    },
  },
  methods: {
    findAccount() {
      if (this.document.length > 6) {
        FINDACCOUNT(this.document)
          .then((res) => {
            if (res.data.ok) {
              FINDCLIENT(res.data.data.client)
                .then((res2) => {
                  if (res2.data.ok) {
                    this.client = res2.data.data;
                    this.account = res.data.data;
                  }
                })
                .catch((e) => console.log(e));
            } else {
              this.account = null;
            }
          })
          .catch((e) => console.log(e));
      } else {
        this.account = null;
      }
    },
    pay() {
      MAKEMOVEMENT(
        this.account.client,
        'pay',
        `abono dia ${new Date().toString().substr(4, 20)}`,
        this.mount,
      ).then((resDB) => {
        if (resDB.data.ok) {
          alert('Pago Realizado Con exito');
          this.clean();
        } else {
          alert('algo sucedio');
          console.log(resDB);
        }
      });
    },
    clean() {
      this.dialog = false;
      this.confirm = false;
      this.document = '';
      this.account = null;
      this.mount = null;
      this.client = null;
    },
  },
};
</script>
