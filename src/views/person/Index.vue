<template>
    <v-container>
        <v-card flat class="rounded-b-xl elevation-4">
            <div class="d-flex justify-space-between table-title">
                <v-card-title>
                    <h2>Pessoas</h2>
                </v-card-title>

                <v-card-title>
                    <v-btn @click="openAddDialog" variant="tonal" color="primary">Adicionar novo</v-btn>
                    <Dialog v-model="isDialogOpen" :item="itemToEdit" :mode="mode" />
                </v-card-title>
            </div>

            <v-card-title class="table-title">
                <v-text-field label="Filtrar pessoas" v-model="filter" prepend-icon="mdi-filter-multiple"
                    variant="underlined"></v-text-field>
            </v-card-title>
            <v-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-center">
                            Nome
                        </th>
                        <th class="text-left">
                            CPF
                        </th>
                        <th class="text-left">
                            Data de Nascimento
                        </th>
                        <th class="text-left">
                            Ativo
                        </th>
                        <th class="text-left actions-column">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredData" :key="item.id">
                        <td class="text-center">{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.cpf }}</td>
                        <td>{{ item.dateBirthday }}</td>
                        <td>{{ item.active }}</td>
                        <td>
                            <v-menu>
                                <template #activator="{ props }">
                                    <v-btn flat v-bind="props" icon class="mr-2">
                                        <v-icon icon="mdi-dots-vertical"></v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-list lines="true" nav>
                                        <v-list-item>
                                            <v-btn @click="openEditDialog(item, mode)" prepend-icon="mdi-pencil"
                                                variant="tonal" color="info">Editar</v-btn>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-btn @click.stop="openConfirmDeleteDialog(item)" prepend-icon="mdi-cog-outline" variant="tonal" color="error">
                                                Excluir
                                            </v-btn>
                                            <ConfirmDeleteDialog v-model="isDialogDeleteOpen" @confirm="deleteItem(item)" />
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

    </v-container>
</template>
  
<script>
import { ref } from 'vue'
import Dialog from './Dialog.vue';
import ConfirmDeleteDialog from '@/components/dialogs/ConfirmDeleteDialog.vue';
import axios from 'axios';

const isDialogOpen = ref(false)
const isDialogDeleteOpen = ref(false)

export default {
    methods: {
        openAddDialog() {
            this.mode = 'add';
            this.isDialogOpen = true;
        },
        openEditDialog(item) {
            this.mode = 'edit';
            this.itemToEdit = item;
            this.isDialogOpen = true;
        },
        openConfirmDeleteDialog(item) {
            this.itemToDelete = item;
            this.isDialogDeleteOpen = true;
        },
        deleteItem(item) {
            console.log("Item excluído:", item);
        },
    },
    components: {
        Dialog,
        ConfirmDeleteDialog
    },
    computed: {
        filteredData() {
            return this.persons.filter(persons =>
                persons.name.toLowerCase().includes(this.filter.toLowerCase()) ||
                persons.id.toString().includes(this.filter) ||
                persons.celular.toLowerCase().includes(this.filter.toLowerCase()) ||
                persons.cidade.toLowerCase().includes(this.filter.toLowerCase())
            );
        }
    },
    data() {
    return {
      persons: [],
      mode: 'add',
            itemToEdit: null,
            itemToDelete: null,
            isDialogOpen: false,
            isDialogDeleteOpen: false,
            filter: '',
            props: {
                item: {
                    type: Object,
                    default: null
                },
            },
    };
  },
  mounted() {
    axios.get('http://localhost:5017/api/person')
      .then((response) => {
        this.persons = response.data;
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }
}

</script>
  
<style>
html,
body,
#app,
.v-application,
.v-application--wrap {
    height: 100%;
    margin: 0;
}

.v-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.v-card {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.v-table {
    max-height: 78vh;
    overflow-y: auto;
}

.table-title {
    padding: 20px;
}

.actions-column {
    width: 8%;
}
</style>