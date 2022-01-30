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
                  v-model="showTypeOfProduct"
                  disabled
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  label="Cambiar tipo producto"
                  v-model="newValues.type"
                  :items="typesSelection"
                  item-text="description"
                  @input="selectIdType()"
                ></v-autocomplete>
              </v-col>
              <v-col v-if="newValues.type != product.type">
                <v-btn
                  @click="newValues.type = product.type"
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
            :disabled="validateFinish"
            >Actualizar</v-btn
          >

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <ConfirmDialog
      :dialog="dialogCancel"
      msm="cancelar los cambios?"
      description="Podra Actualizar Cuando Desee"
      @cancel="dialogCancel = false"
      @acept="redirectUpdateProducts()"
    />
    <ConfirmDialog
      :dialog="dialogFinish"
      msm="Actualizar Los Datos?"
      :description="finishText"
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
import { LISTPRODUCTSTYPE } from '../../services/producttype';

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
        type: null,
      },
      touch: {
        description: true,
        cost_price: true,
        sale_price: true,
        quantity: true,
        expire_date: true,
      },
      typesSelection: [],
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
    validateFinish() {
      if (
        (this.product.description != this.newValues.description &&
          this.newValues.description.length > 4) ||
        this.product.cost_price != this.newValues.cost_price ||
        (this.product.sale_price != this.newValues.sale_price &&
          this.newValues.sale_price > this.product.cost_price) ||
        this.product.quantity != this.newValues.quantity ||
        this.product.type != this.newValues.type
      ) {
        return false;
      }
      if (this.newValues.expire_date) {
        if (
          this.product.expire_date.substr(0, 10) !=
          this.newValues.expire_date.substr(0, 10)
        ) {
          return false;
        }
      }
      return true;
    },
    finishText() {
      let text = '';
      if (this.product.description != this.newValues.description) {
        text += `Descripción anterior <${this.product.description}> Descripción nueva <${this.newValues.description}>`;
      }
      if (this.product.cost_price != this.newValues.cost_price) {
        text += `, Precio de compra anterior <${this.product.cost_price}> Precio de Compra Nuevo <${this.newValues.cost_price}>`;
      }
      if (this.product.sale_price != this.newValues.sale_price) {
        text += `, Precio de Venta anterior <${this.product.sale_price}> Precio de Venta Nuevo <${this.newValues.sale_price}>`;
      }
      if (this.product.quantity != this.newValues.quantity) {
        text += `, Cantidad de Unidades anterior <${this.product.quantity}> Cantidad de Unidades Nuevo <${this.newValues.quantity}>`;
      }
      if (this.product.type != this.newValues.type) {
        let newType = '';
        let oldType = '';
        this.typesSelection.forEach((element) => {
          if (element.id_type === this.newValues.type) {
            newType = element.description;
          }
          if (element.id_type === this.product.type) {
            oldType = element.description;
          }
        });
        text += `, Tipo de Producto Anterior <${oldType}> Tipo de Producto Nuevo<${newType}>`;
      }
      // if (this.newValues.expire_date) {
      //   if (
      //     this.product.expire_date.substr(0, 10) !=
      //     this.newValues.expire_date.substr(0, 10)
      //   ) {
      //     text += `Fecha anterior <${this.product.expire_date.substr(
      //       0,
      //       10,
      //     )}> Nueva Fecha <${this.newValues.expire_date.substr(
      //       0,
      //       10,
      //     )}>`;
      //   }
      // }
      return text;
    },
    showTypeOfProduct() {
      let typeShow = '';
      this.typesSelection.forEach((element) => {
        if (element.id_type == this.newValues.type) {
          typeShow = element.description;
        }
      });
      return typeShow;
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
        this.newValues.sale_price = this.product.sale_price;
        this.newValues.type = this.product.type;
        if (this.product.expire_date.substr(0, 10) != '2000-01-01') {
          this.expire = false;
          this.newValues.expire_date =
            this.product.expire_date.substr(0, 10);
        } else {
          console.log('no expira');
          this.expire = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    updateProduct() {
      let expire_date = '';
      if (
        !this.newValues.expire_date ||
        this.newValues.expire_date == '2000-01-01'
      ) {
        expire_date = new Date('2000-01-01');
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
        this.newValues.type,
        'ACTIVE',
      )
        .then((res) => {
          if (res.data.ok) {
            this.clean();
            this.loadProduct();
          } else {
            alert(
              'Error, Esa descripción de producto esta repetida, o el precio de venta es invalido favor ingrese otro',
            );
            this.dialogFinish = false;
          }
        })
        .catch(() => {
          this.dialogFinish = false;
          alert('Ya existe un producto con esa descripción');
        });
    },
    validateExpire() {
      if (this.expire) {
        this.newValues.expire_date = null;
        this.touch.expire_date = true;
      } else {
        if (this.product.expire_date.substr(0, 10) == '2000-01-01') {
          this.newValues.expire_date = null;
        } else {
          this.newValues.expire_date =
            this.product.expire_date.substr(0, 10);
        }
      }
    },
    listproducttype() {
      LISTPRODUCTSTYPE()
        .then((e) => {
          this.typesSelection = e.data.data;
          this.loadProduct();
        })
        .catch((e) => console.log(e));
    },
    selectIdType() {
      console.log(this.newValues.type);
      this.typesSelection.forEach((type) => {
        if (type.description === this.newValues.type) {
          this.newValues.type = type.id_type;
        }
      });
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
    this.listproducttype();
  },
};
</script>
