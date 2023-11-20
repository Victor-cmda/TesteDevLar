<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <div class="background-image">
    <v-container class="fill-height" fluid>
      <v-row class="fill-height" fluid justify="center">
        <v-col cols="12" sm="8" md="4" style="align-self: center;">
          <v-card class="elevation-12">
            <v-card-title class="headline">{{ isLoginMode ? 'Login' : 'Registro' }}</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="userData.username" :rules="usernameRules" label="Usuário" required></v-text-field>

                <v-text-field v-model="userData.password" :rules="passwordRules" label="Senha" type="password"
                  required></v-text-field>

                <v-text-field v-if="!isLoginMode" v-model="confirmPassword" :rules="confirmPasswordRules"
                  label="Confirmar Senha" type="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="submit">{{ isLoginMode ? 'Login' : 'Registrar' }}</v-btn>
              <v-btn text @click="toggleMode">{{ isLoginMode ? 'Criar uma conta' : 'Já tenho uma conta' }}</v-btn>
            </v-card-actions>
          </v-card>
          <v-alert type="success" title="Sucesso" v-if="successRegister" text="Cadastrado com Sucesso!"></v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: true,
      isLoginMode: true,
      overlay: false,
      successRegister: false,
      userData: {
        username: '',
        password: ''
      },
      confirmPassword: '',
      usernameRules: [
        v => !!v || 'Usuário é obrigatório',
        v => (v && v.length >= 3) || 'Usuário deve ter pelo menos 3 caracteres'
      ],
      passwordRules: [
        v => !!v || 'Senha é obrigatória',
        v => (v && v.length >= 6) || 'Senha deve ter pelo menos 6 caracteres'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirmação de senha é obrigatória',
        v => v === this.userData.password || 'As senhas não coincidem'
      ]
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate() && (!this.userData.username || !this.userData.password)) {
        return;
      }
      try {
        this.overlay = true;
        const response = await axios.post(
          `http://localhost:5017/api/${this.isLoginMode ? 'auth' : 'user'}`,
          {
            username: this.userData.username,
            password: this.userData.password
          }
        );

        localStorage.setItem('userToken', response.data.token);
        
        if (this.isLoginMode) {
          this.$router.push({ name: 'Home' });
        }
        else {
          this.isLoginMode = true;
          this.successRegister = true;

        }
      } catch (error) {
        console.error("Erro:", error.response.data);
      } finally {
        this.overlay = false;
      }

    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    }
  }
};
</script>

<style scoped>
.background-image {
  background-image: url('https://enredo.com.br/wp-content/uploads/2020/06/Agro-3_Lar-Cooperativa.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>