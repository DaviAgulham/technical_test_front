<template>
    <v-container>
        <div class="text-h4 mb-4">Clientes</div>
        <v-card>
            <v-col cols="12">
                <div class="text-h6 mt-4 mb-4">Filtros</div>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                            label="Estado"
                            :items="['Estado 1', 'Estado 2']"
                        ></v-select>
                    </v-col>
                    <v-col cols="4" class="d-flex align-center">
                        <v-btn color="secondary">Filtrar</v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-table>
                <thead>
                <tr>
                    <th class="text-left font-weight-bold">
                    ID
                    </th>
                    <th class="text-left font-weight-bold">
                    Nombre
                    </th>
                    <th class="text-left font-weight-bold">
                    Teléfono
                    </th>
                    <th class="text-left font-weight-bold">
                    Dirección
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="customer in customers"
                    :key="customer.id"
                >   
                    <td>{{ customer.id }}</td>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.phone }}</td>
                    <td>{{ customer.address }}</td>
                </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>
</template>


<script>
    import CustomerService from "@/services/customerService"

    export default {
        data() {
            return {
                customers: []
            }
        },

        async created() {
            const response = await CustomerService.get()
            const result = await response.json()

            this.customers = result
        }
    }
</script>