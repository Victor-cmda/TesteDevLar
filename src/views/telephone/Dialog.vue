<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-dialog v-model="isOpen" fullscreen transition="dialog-bottom-transition">
      <v-card>

        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ mode === 'add' ? 'Adicionar Telefones' : 'Editar Telefones' }}</v-toolbar-title>
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
                <v-card class="equal-height-card" prepend-icon="mdi-phone-incoming">
                  <template v-slot:title>
                    Número
                  </template>
                  <v-card-text>
                    <v-text-field label="Número" maxlength="15" :rules="[rules.required]"
                      v-model="telephoneData.number" @blur="formatPhoneNumber"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="equal-height-card" prepend-icon="mdi-phone-hangup">
                  <template v-slot:title>
                    Tipo de telefone
                  </template>
                  <v-card-text>
                    <v-radio-group v-model="telephoneData.typeNumber">
                      <v-radio label="Celular" :value="1"></v-radio>
                      <v-radio label="Residencial" :value="2"></v-radio>
                      <v-radio label="Comercial" :value="3"></v-radio>
                    </v-radio-group>
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
      formattedDate: '',
      telephoneData: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        number: '',
        typeNumber: 1
      },
      initialtelephoneData: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        number: '',
        typeNumber: 1
      },
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        phoneNumber: value => {
        const pattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return pattern.test(value) || 'Número de telefone inválido.';
      },
      }
    };
  },
  watch: {
    item(newVal) {
      if (this.mode === 'edit' && newVal) {
        this.telephoneData = { ...newVal };
      }
    }
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
  methods: {
    async addTelephone(telephoneData) {
      try {
        const response = await axios.post('http://localhost:5017/api/telephone', telephoneData);
        console.log(response.data);
        this.$emit('update-list');
        this.close();
      } catch (error) {
        console.error(error);
      }
    },
    async editTelephone(telephoneData) {
      try {
        const response = await axios.put('http://localhost:5017/api/telephone/' + telephoneData.id, telephoneData);
        console.log(response.data);
        this.$emit('update-list');
        this.close();
      } catch (error) {
        console.error(error);
      }
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        const telephoneDataToSend = {
          ...this.telephoneData,
        };
        if (this.mode === 'add') {
          this.addTelephone(telephoneDataToSend);
        } else {
          this.editTelephone(telephoneDataToSend);
        }
      }
    },
    resetForm() {
      this.telephoneData = { ...this.initialtelephoneData };
    },
    formatPhoneNumber() {
      let numbers = this.telephoneData.number.replace(/\D/g, '');
      let formattedNumber;

      if (numbers.length <= 10) { 
        formattedNumber = numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else { 
        formattedNumber = numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }

      this.telephoneData.number = formattedNumber;
    },
    close() {
      this.isOpen = false;
      this.resetForm();
    },
  },
};
</script>
