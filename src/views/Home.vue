<template>
  <v-parallax src="https://enredo.com.br/wp-content/uploads/2020/06/Agro_Lar-Cooperativa.jpg">
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">
        <v-img :width="140" aspect-ratio="16/9" cover src="../assets/LogoLar.png"></v-img>
      </h1>
      <h4 class="text-h4 font-weight-thin mb-4">
        Cooperativa Agroindustrial
      </h4>
    </div>
  </v-parallax>

  <div>
    <v-container>
      <v-timeline>

        <v-timeline-item dot-color="red-lighten-1">
          <v-card>
            <v-img class="align-end text-white" height="200" src="../assets/larCard.jpg" cover>
              <v-card-title>Quer comprar com facilidade?</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
              Larcard
            </v-card-subtitle>
            <v-card-text>
              <div>Utilize o Larcard e realize pagamentos de forma segura e sem complicação, em toda a nossa rede de
                supermercados, postos de combustíveis e lojas de conveniência.</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">
                Saiba Mais
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-timeline-item>

        <v-timeline-item dot-color="red-lighten-1" fill-dot size="x-small">
          <v-card>
            <v-img class="align-end text-white" height="200" src="../assets/larSupermercados.jpg" cover>
              <v-card-title>Diversas lojas no oeste do Paraná</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
              Lar Supermercados
            </v-card-subtitle>
            <v-card-text>
              <div>
                Ambientes climatizados que prezam pela facilidade logística e acessibilidade.
                É a LAR cuidando de cada detalhe para suas compras.
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">
                Saiba Mais
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>

        <v-timeline-item dot-color="red-lighten-1" fill-dot>
          <v-card>
            <v-img class="align-end text-white" height="200" src="../assets/larPostos.png" cover>
              <v-card-title>Abasteça com confiança</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
              Lar Postos
            </v-card-subtitle>
            <v-card-text>
              <div>
                Nossa rede de postos traz combustíveis de qualidade para você seguir sempre em frente.
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">
                Saiba Mais
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>

  <v-footer color="red darken-4" padless>
    <v-container fluid>
      <v-row no-gutters class="white--text align-center justify-center">
        <v-col cols="12" md="2" class="my-2">
          <v-img :width="120" aspect-ratio="16/9" cover src="https://www.lar.ind.br/wp-content/themes/lar-by-housecricket/images/logo-footer.png"></v-img>
        </v-col>
        <v-col cols="12" md="2" class="my-2">
          <h5 class="font-weight-bold mb-2">Links Úteis</h5>
          <a href="#" class="footer-link">Institucional</a>
          <a href="#" class="footer-link">Notícias</a>
          <a href="#" class="footer-link">Carreiras</a>
        </v-col>

        <v-col cols="12" md="2" class="my-2">
          <h5 class="font-weight-bold mb-2">Fale Conosco</h5>
          <a href="#" class="footer-link">Contato</a>
          <a href="#" class="footer-link">Suporte</a>
        </v-col>

        <v-col cols="12" md="2" class="my-2">
          <h5 class="font-weight-bold mb-2">SAC</h5>
          <div class="mb-2">0800 123 4567</div>
          <div class="grey--text text--lighten-1 mb-2">Segunda a sexta: 8h às 18h</div>
          <a href="#" class="footer-link">
            <v-icon left>mdi-facebook</v-icon> Facebook
          </a>
          <a href="#" class="footer-link">
            <v-icon left>mdi-instagram</v-icon> Instagram
          </a>
          <a href="#" class="footer-link">
            <v-icon left>mdi-linkedin</v-icon> LinkedIn
          </a>
        </v-col>

      </v-row>
      <v-row no-gutters class="white--text text-center mt-3">
        <v-col cols="12" style="align-items: center; display: flex; align-content: center;">
          <div>&copy;{{ new Date().getFullYear() }} Lar Cooperativa Agroindustrial. Todos os direitos reservados.</div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>

</script>

<style scoped>
.footer-link {
  display: block;
  padding: 5px 0;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover,
.footer-link:focus {
  color: #bbb;
}

.footer-link v-icon {
  margin-right: 8px;
}

@media (min-width: 960px) {
  .v-col {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
}

</style>