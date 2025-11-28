<template>
  <q-page class="flex flex-center column q-gutter-md">
    <h1>Seleccionar Categoría</h1>
    <p>Elige una categoría para el juego:</p>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6" color="black">Animales</div>
        <div class="text-subtitle2">Palabras relacionadas con animales</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="primary"
          label="Seleccionar"
          @click="seleccionarCategoria('animales')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Frutas</div>
        <div class="text-subtitle2">Palabras relacionadas con frutas</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="primary"
          label="Seleccionar"
          @click="seleccionarCategoria('frutas')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Países</div>
        <div class="text-subtitle2">Nombres de países</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="primary"
          label="Seleccionar"
          @click="seleccionarCategoria('paises')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Colores</div>
        <div class="text-subtitle2">Nombres de colores</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="primary"
          label="Seleccionar"
          @click="seleccionarCategoria('colores')"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// Estado del juego
const estadoJuego = reactive({
  categoriaSeleccionada: null,
  dificultadSeleccionada: null,
  palabraActual: '',
  letrasAdivinadas: [],
  intentosFallidos: 0,
  maxIntentos: 6,
  tiempoInicio: null,
  tiempoFin: null,
  juegoTerminado: false,
  ganado: false
})

// Datos de palabras por categoría
const palabrasPorCategoria = {
  animales: ['gato', 'perro', 'elefante', 'leon', 'tigre', 'oso', 'conejo', 'pajaro'],
  frutas: ['manzana', 'platano', 'naranja', 'uva', 'pera', 'sandia', 'melon', 'fresa'],
  paises: ['espana', 'francia', 'italia', 'alemania', 'brasil', 'mexico', 'argentina', 'colombia'],
  colores: ['rojo', 'azul', 'verde', 'amarillo', 'morado', 'rosa', 'negro', 'blanco']
}

const router = useRouter()

const seleccionarCategoria = (categoria) => {
  estadoJuego.categoriaSeleccionada = categoria
  router.push('/difficulty')
}

// Funciones para compartir estado entre componentes
const useGameState = () => {
  return { estadoJuego, palabrasPorCategoria }
}

// Exportar para usar en otros componentes
window.estadoJuego = estadoJuego
window.palabrasPorCategoria = palabrasPorCategoria
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
