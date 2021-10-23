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
                v-model="type"
                :items="typesSelection"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="expire_date"
                label="Fecha de Expiración"
                type="date"
                :disabled="noexpire"
              ></v-text-field>
              <v-checkbox v-model="noexpire" label="No expira"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-btn
            :disabled="
              !description ||
              !type ||
              quantity < 0 ||
              total_price < 0 ||
              (!expire_date && !noexpire)
            "
            @click="registerProduct()"
            class="primary"
            >Registrar Producto</v-btn
          >
          <!-- || !description || !cost_price || !sale_price -->
          <Barcode :code="code" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { registerProduct } from "../services/sales";
import Barcode from "../components/Barcode";
export default {
  name: "RegisterProducts",
  components: {
    Barcode,
  },
  data() {
    return {
      product: null,
      code: "",
      description: "",
      total_price: null,
      quantity: 24,
      typesSelection: [
        "Granos",
        "Aseo y Limpieza",
        "Enlatados",
        "Frituras",
        "Variedades",
        "Verduras",
        "Dulces",
        "Lacteos",
        "Panaderia",
        "Plasticos y recipientes",
        "Galletas",
        "Papeleria",
        "Bebidas",
        "Jugueteria",
        "Licores",
        "Tecnologia",
        "Agro",
        "Utiles Escolares",
        "Bebidas",
        "Detalles",
        "Bioseguridad",
      ],
      type: "",
      expire_date: "",
      noexpire: false,
    };
  },
  methods: {
    registerProduct() {
      if (this.noexpire) {
        this.expire_date = "2100-01-01";
      }
      const cost = Number(this.total_price) / Number(this.quantity);
      const sale = Number(cost) + Number(cost) * 0.15;
      registerProduct(
        this.description,
        cost,
        sale,
        this.quantity,
        this.type,
        this.expire_date
      )
        .then((result) => {
          if (result.data.ok) {
            this.product = result.data.data;
            this.code = result.data.data.code;
            this.cleanForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cleanForm() {
      this.product = null;
      this.code = "";
      this.description = "";
      this.cost_price = "";
      this.sale_price = "";
      this.quantity = 24;
      this.type = "";
      this.expire_date = "";
      this.total_price = null;
    },
  },
};
</script>
