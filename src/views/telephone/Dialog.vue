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
            <v-col cols="6"><v-text-field label="Nome" v-model="telephoneData.Name"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="CPF" v-model="telephoneData.Cpf"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="Data Nascimento" v-model="telephoneData.DateOfBirth"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="Ativo" v-model="telephoneData.Active"></v-text-field></v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>

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
      telephoneData: {
        Name: '',
        Cpf: '',
        DateOfBirth: '',
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
  methods: {
    save() {
      // Lógica para salvar o cliente (adicionar ou editar)
      this.close();
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
