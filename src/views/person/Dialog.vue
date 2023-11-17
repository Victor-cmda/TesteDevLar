<template>
  <v-dialog v-model="isOpen" fullscreen transition="dialog-bottom-transition">
    <v-card>

      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ mode === 'add' ? 'Adicionar Pessoas' : 'Editar Pessoas' }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="save">
            Salvar
          </v-btn>
        </v-toolbar-items>
        <template v-slot:extension>
          <v-tabs v-model="activeTab">
            <v-tab key="Geral">Geral</v-tab>
            <v-tab key="Telefones">Telefones</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <div v-if="activeTab == 0">
        <v-container>
          <v-list-subheader>Geral</v-list-subheader>
          <v-row>
            <v-col cols="6"><v-text-field label="Nome" v-model="personData.Name"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="CPF" v-model="personData.Cpf"></v-text-field></v-col>
            <v-col cols="6">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="personData.DateOfBirth" :value="formatDate(personData.DateOfBirth)"
                    label="Data Nascimento" readonly v-bind="attrs"
                    @click="openDatePicker"></v-text-field>
                </template>
                <v-date-picker v-model="personData.DateOfBirth"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6"><v-text-field label="Ativo" v-model="personData.Active"></v-text-field></v-col>
          </v-row>
        </v-container>
      </div>

      <div v-if="activeTab == 1">
        <v-container>
          <v-list-subheader>Telefones</v-list-subheader>
          <v-row>
            <v-col cols="6"><v-text-field label="Telefone 1" v-model="personData.Telefone1"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="Telefone 2" v-model="personData.Telefone2"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="Telefone 3" v-model="personData.Telefone3"></v-text-field></v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      default: 'add',
    },
    client: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: 'Geral',
      menu: false,
      formattedDate: '',
      personData: {
        Name: '',
        Cpf: '',
        DateOfBirth: new Date(),
        Active: '',
      },
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  watch: {
    'personData.DateOfBirth': function (newDate, oldDate) {
      if (newDate !== oldDate) {
        this.menu = false;
      }
    }
  },
  methods: {
    async save() {
      if (this.mode === 'add') {
        await this.addPerson();
      } else {
        await this.editPerson();
      }
      this.close();
    },
    async addPerson() {
      try {
        const response = await axios.post('/api/person', this.personData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editPerson() {
      try {
        const response = await axios.put('/api/person/' + this.personData.id, this.personData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      if (!date) return null;
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    openDatePicker() {
      this.menu = true;
    },
    closeDatePicker() {
      this.menu = false;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
