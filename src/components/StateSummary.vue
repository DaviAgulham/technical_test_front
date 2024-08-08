<template>
    <v-container>
      <!-- Título -->
      <v-row>
        <v-col cols="12">
          <div class="summary-title">Total de clientes por estado</div>
        </v-col>
      </v-row>
  
      <!-- Resumen de estados -->
      <v-row class="state-summary-row">
        <v-col
          v-for="state in statesSummary"
          :key="state.id"
          cols="10"
          md="2"
          class="state-summary-col"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ state.name }}</v-list-item-title>
              <v-list-item-subtitle>Total: {{ state.total }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import StateService from "@/services/stateService";
  
  export default {
    data() {
      return {
        statesSummary: []
      };
    },
    async created() {
      try {
        const response = await StateService.getSummary();
        if (response) {
          this.statesSummary = response;
        }
      } catch (error) {
        console.error("Error fetching states summary:", error);
      }
    }
  };
  </script>
  
  <style scoped>
  .summary-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #FFFF;
  }
  
  .state-summary-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px; /* Espacio entre los elementos */
  }
  
  .state-summary-col {
    flex: 1 1 calc(33.333% - 16px); /* Tres columnas en una fila con espacio */
    box-sizing: border-box; /* Incluye padding y border en el width */
  }
  
  .v-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    text-align: center;
  }
  
  .v-list-item-content {
    margin: 0;
  }
  </style>
  