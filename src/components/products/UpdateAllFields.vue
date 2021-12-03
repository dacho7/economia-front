<template>
  <v-card class="pb-4 pt-4" v-if="product">
    <v-row>
      <v-col class="text-center">
        <h1>Editar Datos de un Producto</h1>
      </v-col>
    </v-row>
    <v-card-text>
      <v-card color="pb-4 pt-4">
        <v-card-title>
          <h2 class="ml-5">{{ product.description | capitalize }}</h2>
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col>
              <h4 class="pl-5">De Click donde desee editar</h4>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  disabled
                  v-model="product.code"
                  label="Código"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col @click="touch.description = false">
                <v-text-field
                  label="Descripción"
                  v-model="newValues.description"
                  :disabled="touch.description"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-row>
                  <v-col @click="touch.cost_price = false">
                    <v-text-field
                      label="Precio de Compra Unitario"
                      v-model="newValues.cost_price"
                      :disabled="touch.cost_price"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      disabled
                      v-model="utility"
                      label="Ganancia Neta(No modificable)"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      disabled
                      v-model="utilityporcent"
                      label="Porcentaje de Ganancia(No modificable)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col @click="touch.sale_price = false">
                <v-text-field
                  label="Precio De venta"
                  v-model="newValues.sale_price"
                  :disabled="touch.sale_price"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col @click="touch.quantity = false">
                <v-text-field
                  label="Cantidad de Productos En Inventario"
                  v-model="newValues.quantity"
                  :disabled="touch.quantity"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="expire">
                <h3>Fecha de Expiración: No expira</h3>
              </v-col>
              <v-col v-else @click="touch.expire_date = false">
                <v-text-field
                  label="Fecha de Expiracón"
                  type="date"
                  v-model="newValues.expire_date"
                  :disabled="touch.expire_date"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-checkbox
                  @click="validateExpire()"
                  label="No expira"
                  v-model="expire"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Tipo de Producto"
                  v-model="product.type"
                  disabled
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  label="Cambiar tipo producto"
                  v-model="newValues.type"
                  :items="typesSelection"
                ></v-autocomplete>
              </v-col>
              <v-col v-if="newValues.type">
                <v-btn
                  @click="newValues.type = null"
                  block
                  class="warning"
                  >Cancelar</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-5 pb-5 white-text">
          <v-spacer></v-spacer>
          <v-btn large class="col-4" @click="dialogCancel = true"
            >Cancelar</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            large
            class="col-4 success"
            @click="dialogFinish = true"
            >Actualizar</v-btn
          >

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <ConfirmDialog
      :dialog="dialogCancel"
      msm="cancelar los cambios"
      description="Podra Actualizar Cuando Desee"
      @cancel="dialogCancel = false"
      @acept="redirectUpdateProducts()"
    />
    <ConfirmDialog
      :dialog="dialogFinish"
      msm="Actualizar Los Datos"
      description="Podra Actualizar Cuando Desee"
      @cancel="dialogFinish = false"
      @acept="updateProduct()"
    />
  </v-card>
  <v-card v-else>
    <v-row class="text-center">
      <v-col>
        <h1>No existe ese producto</h1>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { FINDPRODUCTBYID } from '../../services/products';
import ConfirmDialog from '../confirmDialog/ConfirmDialog.vue';
import { UPDATEPRODUCT } from '../../services/products';

export default {
  name: 'UpdateAllFields',
  components: { ConfirmDialog },
  data() {
    return {
      product: null,
      newValues: {
        description: null,
        cost_price: null,
        sale_price: null,
        quantity: null,
        expire_date: null,
      },
      touch: {
        description: true,
        cost_price: true,
        sale_price: true,
        quantity: true,
        expire_date: true,
      },
      typesSelection: [
        'Granos',
        'Aseo y Limpieza',
        'Enlatados',
        'Frituras',
        'Variedades',
        'Verduras',
        'Dulces',
        'Lacteos',
        'Panaderia',
        'Plasticos y recipientes',
        'Galletas',
        'Papeleria',
        'Bebidas',
        'Jugueteria',
        'Licores',
        'Tecnologia',
        'Agro',
        'Utiles Escolares',
        'Bebidas',
        'Detalles',
        'Bioseguridad',
        'Herramientas',
        'Farmacia',
        'Promociones',
        'Cereales',
        'Embutidos',
        'Carnes',
      ],
      expire: false,
      dialogCancel: false,
      dialogFinish: false,
    };
  },
  computed: {
    utility() {
      return this.newValues.sale_price - this.newValues.cost_price;
    },
    utilityporcent() {
      return (
        (
          100 *
          ((this.newValues.sale_price - this.newValues.cost_price) /
            this.newValues.sale_price)
        )
          .toString()
          .substr(0, 5) + ' %'
      );
    },
  },
  methods: {
    redirectUpdateProducts() {
      this.$router.push('/updateprice');
    },
    async loadProduct() {
      try {
        const result = await FINDPRODUCTBYID(this.$route.params.id);
        this.product = result.data.data;
        this.newValues.description = this.product.description;
        this.newValues.cost_price = this.product.cost_price;
        this.newValues.sale_price = this.product.sale_price;
        this.newValues.quantity = this.product.quantity;
        this.newValues.expire_date = this.product.expire_date;
        this.newValues.price = this.product.sale_price;
        if (this.product.expire_date.substr(0, 10) != '2100-01-01') {
          this.expire = false;
          this.newValues.expire_date =
            this.product.expire_date.substr(0, 10);
        } else {
          this.expire = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    updateProduct() {
      let expire_date = '';
      let type = '';
      if (!this.newValues.type) {
        type = this.product.type;
      } else {
        type = this.newValues.type;
      }
      if (
        !this.newValues.expire_date ||
        this.newValues.expire_date == '2100-01-01'
      ) {
        expire_date = new Date('2100-01-01');
      } else {
        expire_date = this.newValues.expire_date;
      }
      UPDATEPRODUCT(
        this.product.id_product,
        this.newValues.description,
        this.newValues.cost_price,
        this.newValues.sale_price,
        this.newValues.quantity,
        expire_date,
        new Date(),
        this.product.date_arrive,
        type,
        'Active',
      )
        .then((res) => {
          if (res.data.ok) {
            this.clean();
            this.loadProduct();
          } else {
            alert('Algo sucedio intente nuevamente');
          }
        })
        .catch((e) => console.log(e));
    },
    validateExpire() {
      if (this.expire) {
        this.newValues.expire_date = null;
        this.touch.expire_date = true;
      } else {
        if (this.product.expire_date.substr(0, 10) == '2100-01-01') {
          this.newValues.expire_date = null;
        } else {
          this.newValues.expire_date =
            this.product.expire_date.substr(0, 10);
        }
      }
    },
    clean() {
      this.dialogFinish = false;
      this.touch.description = true;
      this.touch.cost_price = true;
      this.touch.sale_price = true;
      this.touch.quantity = true;
      this.touch.expire_date = true;
      this.newValues.type = null;
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
