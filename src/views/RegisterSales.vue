<template>
  <v-main>
    <v-container mt-4>
      <v-layout xs12>
        <v-flex xs6>
          <v-text-field 
            color="blue-grey lighten-2" 
            label="Cliente" 
            v-model="client">
          </v-text-field>
        </v-flex>
        <v-flex xs6 class="gray--text">
          <h4>Fecha</h4>
          <h4>{{date}}</h4>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout>
        <v-flex>
          
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "RegisterSales",
  data() {
    return {
      client: '',
      date: ''
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