<template>
  <q-page padding>
    <q-table
      flat bordered
      title="Libros del Autor"
      :rows="books"
      :columns="columns"
      row-key="key"
      @row-click="onRowClick"
    />
  </q-page>

</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const books = ref([]);

    const columns = [
      { name: 'author', label: 'Autor', field: 'author', align: 'left' },
      { name: 'title', label: 'Título', field: 'title', align: 'left' },
      { name: 'subjects', label: 'Subjects', field: 'subjects', align: 'left' }
    ];

    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/authors/OL1394244A/works.json?limit=5');
        books.value = response.data.entries.map(entry => ({
          author: "Cory Doctorow", // Se obtiene del autor de la API
          title: entry.title,
          subjects: entry.subjects ? entry.subjects.join(', ') : 'No disponible'
        }));
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };


    onMounted(fetchBooks);

    return { books, columns };
  }
};
</script>
