<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="isOpen" fullscreen transition="dialog-bottom-transition">
      <v-card>

        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ mode === 'add' ? 'Adicionar Pessoas' : 'Editar Pessoas' }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="submitForm">
              Salvar
            </v-btn>
          </v-toolbar-items>
          <template v-slot:extension>
            <v-tabs v-model="activeTab">
              <v-tab key="Geral">Geral</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <div v-if="activeTab == 0">
          <v-container>
            <v-list-subheader>Geral</v-list-subheader>
            <v-row>
              <v-col cols="6">
                <v-card class="equal-height-card" prepend-icon="mdi-calendar-range">
                  <template v-slot:title>
                    Data de Nascimento
                  </template>
                  <v-card-text>
                    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="personData.dateBirthday" :rules="[rules.required]"
                          :value="formatDate(personData.dateBirthday)" label="Data Nascimento" readonly v-bind="attrs"
                          @click="openDatePicker"></v-text-field>
                      </template>
                      <v-date-picker v-model="personData.dateBirthday"></v-date-picker>
                    </v-menu>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="equal-height-card" prepend-icon="mdi-list-status">
                  <template v-slot:title>
                    Status
                  </template>
                  <v-card-text>
                    <v-radio-group v-model="personData.active">
                      <v-radio label="Ativo" :value="true"></v-radio>
                      <v-radio label="Inativo" :value="false"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6"><v-text-field label="Nome" maxlength="50" :rules="[rules.required]"
                  v-model="personData.name"></v-text-field></v-col>
              <v-col cols="6"><v-text-field label="CPF" maxlength="14" :rules="[rules.required]"
                  v-model="personData.cpf"></v-text-field></v-col>
              <v-col cols="12">
                <v-card>
                  <div class="d-flex justify-space-between table-title">
                    <v-card-title>
                      <h3>Telefones</h3>
                    </v-card-title>
                    <v-card-title>
                      <v-btn @click="openTelephonesAddDialog" variant="tonal" color="primary">Adicionar</v-btn>
                      <v-dialog v-model="isTelephoneDialogOpen" transition="dialog-bottom-transition" width="auto">
                        <template v-slot:default="{ isActive }">
                          <v-card>
                            <v-toolbar color="primary" title="Telefones disponíveis"></v-toolbar>
                            <v-card-text>
                              <v-table fixed-header>
                                <thead>
                                  <tr>
                                    <th class="text-center">
                                      Número
                                    </th>
                                    <th class="text-center">
                                      Tipo Telefone
                                    </th>
                                    <th class="text-left actions-column">
                                      Ações
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="telephone in telephonesWithoutUser" :key="telephone.id">
                                    <td class="text-center">{{ telephone.number }}</td>
                                    <td class="text-center">
                                      {{ telephone.typeNumber == 1 ? 'Celular' : telephone.typeNumber == 2 ? 'Residencial'
                                        : telephone.typeNumber == 3 ? 'Comercial' : '' }}
                                    </td>
                                    <td>
                                      <v-checkbox v-model="selectedItems" :value="telephone"></v-checkbox>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-table>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn variant="text" color="primary" @click="insertTelephones">Inserir</v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                    </v-card-title>
                  </div>
                  <v-card-text>
                    <v-table fixed-header>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Número
                          </th>
                          <th class="text-left">
                            Tipo
                          </th>
                          <th class="text-left actions-column">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in personData.telephones" :key="item.id">
                          <td>{{ item.number }}</td>
                          <td> {{ item.typeNumber == 1 ? 'Celular' : item.typeNumber == 2 ? 'Residencial' :
                            item.typeNumber == 3 ? 'Comercial' : '' }}</td>
                          <td>
                            <v-menu>
                              <template #activator="{ props }">
                                <v-btn flat v-bind="props" icon class="mr-2">
                                  <v-icon icon="mdi-dots-vertical"></v-icon>
                                </v-btn>
                              </template>
                              <v-card>
                                <v-list lines="true" nav>
                                  <v-btn @click.stop="deleteItem(item)" prepend-icon="mdi-delete" variant="tonal"
                                    color="error">
                                    Excluir
                                  </v-btn>
                                </v-list>
                              </v-card>
                            </v-menu>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </v-form>
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
    item: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      activeTab: 'Geral',
      menu: false,
      isTelephoneDialogOpen: false,
      formattedDate: '',
      telephonesWithoutUser: [],
      overlay: false,
      personData: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: '',
        cpf: '',
        dateBirthday: new Date(),
        active: true,
        telephones: [

        ]
      },
      selectedItems: [],
      initialPersonData: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: '',
        cpf: '',
        dateBirthday: new Date(),
        active: true,
        telephones: [

        ]
      },
      rules: {
        required: value => (!!value && value != '') || 'Este campo é obrigatório.'
      }
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
    item(newVal) {
      if (this.mode === 'edit' && newVal) {
        this.personData = { ...newVal };
        if (this.personData.dateBirthday) {
          this.personData.dateBirthday = new Date(newVal.dateBirthday);
        }
      }
    },
    'personData.dateBirthday': function (newDate, oldDate) {
      if (newDate !== oldDate) {
        this.menu = false;
      }
    },
    'personData.cpf': function (newValue) {
      this.personData.cpf = this.formatCpf(newValue);
    }
  },
  methods: {
    deleteItem(item) {
      const index = this.personData.telephones.indexOf(item);
      if (index > -1) {
        this.personData.telephones.splice(index, 1);
      }
    },
    insertTelephones() {
      if (!Array.isArray(this.personData.telephones)) {
        this.personData.telephones = [];
      }

      this.selectedItems.forEach(item => {
        if (!this.personData.telephones.some(tel => tel.id === item.id)) {
          this.personData.telephones.push(item);
        }
      });

      this.selectedItems = [];
      this.isTelephoneDialogOpen = false;
    },
    async addPerson(personData) {
      try {
        this.overlay = true;
        const response = await axios.post('http://localhost:5017/api/person', personData);
        console.log(response.data);
        this.$emit('update-list');
        this.close();
      } catch (error) {
        console.error(error);
      } finally {
        this.overlay = false;
      }
    },
    async editPerson(personData) {
      debugger;
      try {
        this.overlay = true;
        const response = await axios.put('http://localhost:5017/api/person/' + personData.id, personData);
        console.log(response.data);
        this.$emit('update-list');
        this.close();
      } catch (error) {
        console.error(error);
      } finally {
        this.overlay = false;
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
    submitForm() {
      if (this.$refs.form.validate() && this.isValidField(this.personData.name) && this.isValidField(this.personData.cpf)) {
        const personDataToSend = {
          ...this.personData,
          cpf: this.formatCpf(this.personData.cpf),
          dateBirthday: new Date(this.personData.dateBirthday).toISOString(),
          telephones: this.personData.telephones || [],
        };
        if (this.mode === 'add') {
          this.addPerson(personDataToSend);
        } else {
          this.editPerson(personDataToSend);
        }
      }
    },
    resetForm() {
      this.personData = { ...this.initialPersonData };
    },
    formatCpf(value) {
      let cpf = value.replace(/\D/g, '');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return cpf;
    },
    isValidField(fieldValue) {
      return fieldValue && fieldValue.trim() !== '';
    },
    async openTelephonesAddDialog() {
      this.overlay = true;
      try {
        const response = await axios.get('http://localhost:5017/api/telephone?filter=NoUser');
        this.telephonesWithoutUser = response.data;
      } catch (error) {
        console.error('Erro ao recarregar a lista:', error);
      } finally {
        this.overlay = false;
      }
      this.isTelephoneDialogOpen = true;
    },
    close() {
      this.isOpen = false;
      this.resetForm();
    },
  },
};
</script>
