<template>
    <q-page class="flex flex-center">
      <q-btn
        color="primary"
        label="Leer NFC"
        @click="readNFC"
      />
      <div v-if="nfcMessage">
        <p>Mensaje leído: {{ nfcMessage }}</p>
      </div>
    </q-page>
  </template>
  
  <script>
  /* eslint-env browser */
  export default {
    data() {
      return {
        nfcMessage: null,
      };
    },
    methods: {
      async readNFC() {
        if (!('NDEFReader' in window)) {
          alert('Web NFC no es compatible con este navegador.');
          return;
        }
  
        try {
          // eslint-disable-next-line no-undef
          const reader = new NDEFReader();
          await reader.scan();
  
          reader.onreading = (event) => {
            const decoder = new TextDecoder();
            this.nfcMessage = decoder.decode(event.message.records[0].data);
            console.log('Mensaje NFC leído:', this.nfcMessage);
          };
  
          reader.onreadingerror = (error) => {
            console.error('Error al leer NFC:', error);
            alert('Error al leer NFC. Intenta de nuevo.');
          };
        } catch (error) {
          console.error('Error al iniciar la lectura NFC:', error);
          alert('No se pudo iniciar la lectura NFC.');
        }
      },
    },
  };
  </script>