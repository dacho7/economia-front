<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="650">
      <v-card>
        <v-card-title class="text-h5">
          Esta seguro que desea {{ msm }}
        </v-card-title>
        <v-card-subtitle v-if="description">
          <v-row class="mt-3">
            <v-col>
              <h3>Descripción: {{ description }}</h3>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="danger"
            color="red darken-1"
            text
            @click="cancel()"
          >
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="finish()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: ['dialog', 'msm', 'description'],
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    finish() {
      this.$emit('acept');
    },
  },
};
</script>
