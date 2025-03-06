<template>
  <q-page class="flex flex-center">
    <q-btn @click="startNfcReader" label="Iniciar lector NFC" color="primary" />
    <div v-if="nfcData">
      <p>Datos NFC: {{ nfcData }}</p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PruebaPage", // Cambié el nombre a "PruebaPage"
  data() {
    return {
      nfcData: null,
    };
  },
  methods: {
    async startNfcReader() {
      // Lógica para leer NFC
    },
  },
};
</script>
