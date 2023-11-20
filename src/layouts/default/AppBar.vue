<template>
  <v-navigation-drawer v-model="isDrawerOpen" v-if="notIsLoginPage">
    <v-list>
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <v-img :width="70" aspect-ratio="16/9" cover src="../../assets/LogoLar.png"></v-img>
          </v-col>
        </v-row>
      </v-container>
      <v-list-item prepend-icon="mdi-home" to="home">Home</v-list-item>
      <v-list-group value="Person">
        <template #activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-multiple-outline" title="Pessoas">
          </v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-account-multiple-plus" to="person">Cadastros</v-list-item>
      </v-list-group>
      <v-list-group value="Telephone">
        <template #activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-phone" title="Telefones">
          </v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-phone-forward" to="telephone">Cadastros</v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar flat class="border-b" v-if="notIsLoginPage">
    <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-row>
        <v-col cols="auto">
          <v-img :width="40" aspect-ratio="16/9" cover src="../../assets/LogoLar.png"></v-img>
        </v-col>
        <v-col>
          <span class="d-none d-md-block">Cooperativa Agroindustrial</span>
        </v-col>
      </v-row>
    </v-app-bar-title>
    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon class="mr-2">
            <v-badge color="primary">
              <template #badge>
                <v-icon icon="mdi-bell-outline"></v-icon>
              </template>
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card min-width="200px">
          <v-list lines="false" density="compact" nav>
            <v-list-item>
              <v-switch v-model="isDark" @change="toggleTheme" small color="primary" hide-details
                label="Modo noite"></v-switch>
            </v-list-item>
            <v-list-item @click="logout" prepend-icon="mdi-account-outline">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const isDrawerOpen = ref(false)
const theme = useTheme()
const router = useRouter()

const isDark = ref(theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'dark' : 'light';
}

function logout() {
  localStorage.removeItem('userToken');
  router.push({ name: 'login' });
}
</script>

<script>
export default {
  computed: {
    notIsLoginPage() {
      return this.$route.name !== "login"
    }
  }
}
</script>
