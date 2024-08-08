<template>
    <div>
      <v-select
        :items="stateOptions"
        v-model="selectedState"
        @change="updateState"
        label="Cambiar Estado"
      ></v-select>
    </div>
  </template>
  
<script>
  import CustomerService from "@/services/customerService";
  
  export default {
    props: ['customerId'],
    data() {
      return {
        stateOptions: [
          { value: 1, text: 'Estado 1' },
          { value: 2, text: 'Estado 2' },
          { value: 3, text: 'Estado 3' },
          { value: 4, text: 'Estado 4' },
          { value: 5, text: 'Estado 5' }
        ],
        selectedState: null,
      };
    },
    methods: {
      async updateState() {
        if (this.selectedState) {
          const result = await CustomerService.updateState(this.customerId, this.selectedState);
          if (result) {
            this.$emit('state-updated');
          }
        }
      }
    }
  };
</script>
  