/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#eb4d5b',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          primary: '#eb4d5b',
        },
      },
    },
  },
})
