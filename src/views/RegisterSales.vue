<template>
  <v-main>
    <v-container mt-4>
      <v-layout xs12>
        <v-flex xs6 align-self-center>
          <v-text-field 
            color="blue-grey lighten-2" 
            label="Cliente" 
            v-model="client">
          </v-text-field>
        </v-flex>
        <v-flex xs6 ml-5>
          <h4>Fecha</h4>
          <h4>{{date}}</h4>
        </v-flex>
      </v-layout>
    </v-container>
  
    <v-container>
      <template>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Code</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-left">
                  <v-text-field ref="refcode" v-model="amount"></v-text-field>
                </th>
                <td v-on:keyup.enter="findCode(code)">
                  <v-text-field ref="refcode" v-model="code"></v-text-field>
                </td>
                <td v-on:keyup.enter="findCode(item.code)">
                  <v-text-field ></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-simple-table fixed-header height="500px">
          <template mt-6 v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Cantidad</th>
                <th class="text-left">Descripcion</th>
                <th class="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in products" :key="index">
                <td>{{1}}</td>
                <td> {{item.description}}</td>
                <td class="text-right">${{item.salePrice}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        {{products}}
      </template>
    </v-container>
     
    <v-container>
      <v-layout>
        <v-flex>
          <h2 align="center" class="ml-4">Total</h2>
        </v-flex>
        <v-flex>
          <h2 align="center">{{total}}</h2>
        </v-flex>
      </v-layout>
      <v-layout ml-6 mr-6 mt-3 mb-3align="button">
       <v-btn block class="success">Finalizar Compra</v-btn>
      </v-layout>
    </v-container>

  </v-main>
</template>

<script>
import { findProductbyCode } from "../services/sales";

export default {
  name: "RegisterSales",
  data() {
    return {
      client: '',
      date: '',
      total: 0,
      code: '',
      amount: 1,
      products: [],
    }
  },
  methods: {
    getDate(){
      let dat = new Date()

      let day = dat.getDate();
      let month = dat.getMonth()+1;

      let minutes = dat.getMinutes();
      let hours = dat.getHours();

      if (month < 10){
        month = "0"+month;
      }
      if (day < 10){
        day = "0"+day;
      }
      if (minutes < 10){
        minutes = "0"+minutes;
      }
      if (hours < 10){
        hours = "0"+hours;
      }
      const date = `${day}/${month}/${dat.getFullYear()} ${hours}:${minutes}`
      this.date = date
    },
    calculatetotal(){
      let total = 0;
      this.products.forEach( (sale) => {
        total+=sale.subtotal;
      })
      this.total = total
    },
    findCode(code){
      findProductbyCode(code).then( result => {
        console.log(result)
        if (result.data.ok){
          this.products.push(result.data.data)
        }
      }).catch( err => {
        console.log(err)
      })
    }
  },
  created(){
    this.getDate()
  },
  mounted() {
    this.$refs["refcode"].focus();
  },
};
</script>