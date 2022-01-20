<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-container class="text-center">
          <h1 align="center">Registrar productos</h1>
        </v-container>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="description"
                label="Descripción del producto a registrar"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="code"
                label="Ingrese codigo de Barras"
                :disabled="whithoutCode"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="whithoutCode"
                label="No Tiene codigo"
                @change="cleanCodeBar()"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="total_price"
                label="Precio Total de compra"
                title="Mirar en la factura el valor total que se pago por todas las unidades de ese producto"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="quantity"
                label="Cantidad de unidades Recibidas"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                label="Tipo de producto"
                v-model="typeDescription"
                :items="typesSelection"
                item-text="description"
                @input="selectIdType()"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="expire_date"
                label="Fecha de Expiración"
                type="date"
                :disabled="noexpire"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="noexpire"
                label="No expira"
                @change="cleanDate()"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="text-center">
          <v-btn
            large
            :disabled="
              !description ||
              !id_type ||
              quantity < 0 ||
              total_price < 0 ||
              (!expire_date && !noexpire) ||
              description.length < 5
            "
            @click="showConfirRegisterProduct = true"
            class="primary"
            >Registrar Producto</v-btn
          >
          <!-- || !description || !cost_price || !sale_price -->
          <Barcode :code="code" />
        </v-container>
        <ConfirmRegisterProduct
          :dialog="showConfirRegisterProduct"
          @cancel="showConfirRegisterProduct = false"
          @acept="registerProduct()"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { REGISTERPRODUCT } from '../services/products';
import Barcode from '../components/Barcode';
import ConfirmRegisterProduct from '../components/confirmDialog/ConfirmRegisterProduct.vue';
import { LISTPRODUCTSTYPE } from '../services/producttype';

export default {
  name: 'RegisterProducts',
  components: {
    Barcode,
    ConfirmRegisterProduct,
  },
  data() {
    return {
      product: null,
      code: '',
      whithoutCode: false,
      description: null,
      total_price: null,
      quantity: 24,
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
        'Libreria',
      ],
      typeDescription: null,
      id_type: null,
      expire_date: null,
      noexpire: false,
      showConfirRegisterProduct: false,
    };
  },
  methods: {
    registerProduct() {
      if (this.noexpire) {
        this.expire_date = '2000-01-01';
      }
      REGISTERPRODUCT(
        this.description,
        this.code,
        this.total_price,
        this.quantity,
        this.id_type,
        this.expire_date,
      )
        .then((result) => {
          if (result.data.ok) {
            this.product = result.data.data;
            this.code = result.data.data.code;
            this.cleanForm();
          } else {
            console.log(result);
            alert(
              'Intente Registrar nuevamente, puede que exista un producto con esa descripción',
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cleanForm() {
      this.product = null;
      this.code = '';
      this.description = '';
      this.cost_price = '';
      this.sale_price = '';
      this.quantity = 24;
      this.typeDescription = null;
      this.idType = null;
      this.expire_date = null;
      this.total_price = null;
      this.whithoutCode = false;
      this.showConfirRegisterProduct = false;
      this.noexpire = false;
    },
    cleanCodeBar() {
      this.code = '';
    },
    cleanDate() {
      this.expire_date = null;
    },
    listproducttype() {
      LISTPRODUCTSTYPE().then((e) => {
        this.typesSelection = e.data.data;
        console.log(e.data.data);
      });
    },
    selectIdType() {
      this.typesSelection.forEach((type) => {
        if (type.description === this.typeDescription) {
          this.id_type = type.id_type;
        }
      });
    },
  },
  created() {
    this.listproducttype();
  },
};
</script>
