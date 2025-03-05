<template>
  <div>
    <q-layout>
      <q-header bordered class="bg-grey-9 text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn-icons-png.flaticon.com/128/5371/5371682.png">
            </q-avatar>
            Mi Datos en QR
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
        <!------------------------------------------------------------------------------------------------------------->
      <div>
        <!-- Tabla de Quasar con eventos -->
        <q-table
          title="Mi Tabla"
          :rows="rows"
          :columns="columns"
          row-key="name"
          @row-click="onRowClick"
        />
        <!------------------------------------------------------------------------------------------------------------->
        <!-- Diálogo para mostrar información de la celda y generar QR -->
        <q-dialog v-model="dialogVisible">
          <q-card>
            <q-card-section>
              <div class="text-h6">Información de la Celda</div>
            </q-card-section>

            <q-card-section>
              {{ cellInfo }}
            </q-card-section>

            <!-- Botón para generar QR -->
            <q-card-section>
              <q-btn
                label="Generar QR"
                color="primary"
                @click="generateQR"
              />
            </q-card-section>

            <!-- Mostrar el código QR generado -->
            <q-card-section v-if="qrCodeVisible">
              <div ref="qrCodeElement">
                <qrcode-vue :value="qrValue" :size="200" level="H" />
              </div>
            </q-card-section>

            <!-- Botón para descargar el QR -->
            <q-card-section v-if="qrCodeVisible">
              <q-btn
                label="Descargar QR"
                color="secondary"
                @click="downloadQR"
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue';
import html2canvas from 'html2canvas';

export default {
  name: "PrimerComponente", // Nombre válido para ESLint
  components: {
    QrcodeVue, // Registrar el componente QR
  },
  setup() {
    const dialogVisible = ref(false);
    const cellInfo = ref('');
    const qrCodeVisible = ref(false);
    const qrValue = ref('');
    const qrCodeElement = ref(null);

    const columns = [
      { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
      { name: 'age', label: 'Edad', field: 'age', align: 'left' },
      { name: 'address', label: 'Dirección', field: 'address', align: 'left' },
    ];

    const rows = [
      { name: 'Luis', age: 55, address: 'Barrio 789' },
      { name: 'Allison', age: 32, address: 'Arboleda 456' },
      { name: 'Carlos', age: 27, address: 'Kennedy 789' },
      { name: 'Jose', age: 25, address: 'Cañada 123' },
      { name: 'Nivia', age: 30, address: 'Pedregal 456' },
    ];

    const onRowClick = (evt, row) => {
      cellInfo.value = `Nombre: ${row.name}, Edad: ${row.age}, Dirección: ${row.address}`;
      qrCodeVisible.value = false;
      dialogVisible.value = true;
    };

    const generateQR = () => {
      qrValue.value = cellInfo.value;
      qrCodeVisible.value = true;
    };

    const downloadQR = () => {
      html2canvas(qrCodeElement.value).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      });
    };

    return {
      columns,
      rows,
      dialogVisible,
      cellInfo,
      qrCodeVisible,
      qrValue,
      qrCodeElement,
      onRowClick,
      generateQR,
      downloadQR,
    };
  },
};
</script>
