<template>
  <v-container>
    <StateSummary />
    <v-card id="filterCard">
      <v-col cols="12">
        <div class="text-h6 mt-4 mb-4">Filtros</div>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="Nombre"
              v-model="filters.name"
              @input="filterCustomers"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <div class="select-container">
              <select
                id="state-select"
                v-model="filters.state"
                @change="filterCustomers"
                class="custom-select"
              >
                <option value="">Selecciona una opción</option>
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-card>

    <v-card>
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filteredCustomers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ getStateName(customer.current_state_id) }}</td>
            <td>
              <div class="select-container" id="select-customers">
                <select
                  :id="'state-select-' + customer.id"
                  v-model="customer.selectedState"
                  @change="updateCustomerState(customer.id, customer.selectedState)"
                  class="custom-select"
                >
                  <option value="">Selecciona una opción</option>
                  <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import CustomerService from "@/services/customerService";
import StateSummary from '@/components/StateSummary.vue';

export default {
  data() {
    return {
      components: {
        StateSummary,
      },
      customers: [],
      options: [
        { value: 1, text: 'Estado 1' },
        { value: 2, text: 'Estado 2' },
        { value: 3, text: 'Estado 3' },
        { value: 4, text: 'Estado 4' },
        { value: 5, text: 'Estado 5' }
      ],
      filters: {
        name: '',
        state: '',
      },
    };
  },
  async created() {
    await this.fetchCustomers();
  },
  computed: {
    filteredCustomers() {
      const filtered = this.customers.filter(customer => {
        const matchesName = customer.name.toLowerCase().includes(this.filters.name.toLowerCase());
        const matchesState = this.filters.state ? customer.current_state_id === this.filters.state : true;
        return matchesName && matchesState;
      });
      return filtered;
    },
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await CustomerService.get();
        console.log('API response:', response);
        if (response) {
          this.customers = response;
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    filterCustomers() {
      
    },
    async updateCustomerState(customerId, newState) {
      try {
        await CustomerService.updateState(customerId, newState);
      } catch (error) {
        console.error('Error updating customer state:', error);
      }
    },
    getStateName(stateId) {
      const state = this.options.find(option => option.value === stateId);
      return state ? state.text : 'No State';
    }
  },
};
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 16px;
}

.custom-select {
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-top: -8px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  background-color: rgb(42, 43, 44);
  color: #c5c5c5;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  height: 57px;
}

.custom-select:focus {
  border-color: #6200ee;
  outline: none;
  box-shadow: 0 0 0 1px #6200ee;
}

.custom-select option {
  padding: 8px;
  background-color: #fff;
  color: #333;
}

#select-customers{
  margin-top: 20px;
  width: 60%;
}

#filterCard{
  margin-bottom: 2rem;
}
</style>
