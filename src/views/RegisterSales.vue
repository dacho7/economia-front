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
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">Cantidad</th>
            <th class="text-left">Code</th>
            <th class="text-left">Descripcion</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in products" :key="index">
            <td>{{item.cantidad}}</td>
            <td>
              <v-text-field v-model="item.code"></v-text-field>
            </td>
            <td> {{item.description}}</td>
            <td class="text-right">${{item.subtotal}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
    
  </v-main>
</template>

<script>
export default {
  name: "RegisterSales",
  data() {
    return {
      client: '',
      date: '',
      products: [
        { cantidad: 1, code: '823432', description:'margarita personal', subtotal: 10000},
        { cantidad: 1, code: '823432', description:'margarita personal', subtotal: 10000}
      ]
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
    }
  },
  created(){
    this.getDate()
  }
};
</script>