<template>
    <div>
        <input v-model="nameFilter" placeholder="Filtrar por nombre" />
        <select v-model="stateFilter">
            <option value="">Todos los estados</option>
            <option v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ['states'],
    data() {
        return {
            nameFilter: '',
            stateFilter: '',
        };
    },
    computed: {
        filteredCustomers() {
        },
    },
};
</script>
