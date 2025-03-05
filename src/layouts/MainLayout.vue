<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>REGISTRO VEHICULAR</q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <!--------------------------------------------------fdgfgdfgdfdfgdfgd------------------------------->
        <div>
          <!-- Botón de instalación PWA -->
          <q-btn v-if="showInstallButton" @click="installPWA" label="Instalar App" color="positive" />
        </div>
        <!--------------------------------------------------------------------------------->
      </q-toolbar>
    </q-header>
    <!------------------------------------------------------------------------------------------------->
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
      <!------------------------------------------------------------------------------------------------->
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <!------------------------------------------------------------------------------------------------->
          <q-item active clickable v-ripple to="/MiPWA/src/pages/MiDato.vue">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>
            <q-item-section>Mi Datos en QR</q-item-section>
          </q-item>
          <!------------------------------------------------------------------------------------------------->
          <q-item clickable v-ripple to="/MiPWA/src/pages/MiLector.vue">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>
            <q-item-section>Mi NFC</q-item-section>
          </q-item>
          <!------------------------------------------------------------------------------------------------->
          <q-item clickable v-ripple to="/MiPWA/src/pages/TablaLibros.vue">
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>
            <q-item-section>Mi API</q-item-section>
          </q-item>
        </q-list>
        <!---------------------------------------------------------------------------------------------->
      </q-scroll-area>
      <!---------------------------------------------------------------------------------------------->
      <q-img class="absolute-top" src="data:image/jpeg;base64,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" style="height: 150px">

        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://avatars.githubusercontent.com/u/62119402?s=400&v=4">
          </q-avatar>
          <div class="text-weight-bold">Fabiola Flores</div>
          <div>Registro Vehicular</div>
        </div>
      </q-img>
    </q-drawer>
    <!-------------------------------------------------------------------------------------------------->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {

  data() {

    return {
      showInstallButton: false, // Controla la visibilidad del botón
      deferredPrompt: null, // Guardamos el objeto del evento beforeinstallprompt
    };
  },
  mounted() {
    // Escucha el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
  },

  methods: {
    handleBeforeInstallPrompt(event) {
      // Prevenir que se muestre el diálogo de instalación automáticamente
      event.preventDefault();
      this.deferredPrompt = event; // Guardamos el evento para usarlo más tarde
      this.showInstallButton = true; // Mostramos el botón de instalación
    },
    installPWA() {
      // Si el usuario hace clic en el botón, mostramos el prompt para instalar la PWA
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt(); // Mostrar el diálogo de instalación
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('El usuario ha aceptado la instalación de la PWA');
          } else {
            console.log('El usuario ha rechazado la instalación de la PWA');
          }
          this.deferredPrompt = null; // Limpiar el evento
          this.showInstallButton = false; // Ocultar el botón después de intentar la instalación
        });
      }
    },
  },
};

</script>
