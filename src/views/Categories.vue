<template>
  <q-page class="flex flex-center column q-gutter-md q-pa-md">
    <h1>Seleccionar Categoría</h1>
    <p>Elige una categoría para el juego:</p>

    <q-card class="category-card q-pa-md">
      <q-card-section>
        <div class="text-h6">Animales</div>
        <div class="text-subtitle2">Palabras relacionadas con animales</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="select-btn"
          label="Seleccionar"
          @click="seleccionarCategoria('animales')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="category-card q-pa-md">
      <q-card-section>
        <div class="text-h6">Frutas</div>
        <div class="text-subtitle2">Palabras relacionadas con frutas</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="select-btn"
          label="Seleccionar"
          @click="seleccionarCategoria('frutas')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="category-card q-pa-md">
      <q-card-section>
        <div class="text-h6">Países</div>
        <div class="text-subtitle2">Nombres de países</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="select-btn"
          label="Seleccionar"
          @click="seleccionarCategoria('paises')"
        />
      </q-card-actions>
    </q-card>
    <q-card class="category-card q-pa-md">
      <q-card-section>
        <div class="text-h6">Colores</div>
        <div class="text-subtitle2">Nombres de colores</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="select-btn"
          label="Seleccionar"
          @click="seleccionarCategoria('colores')"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState.js'

const { estadoJuego } = useGameState()
const router = useRouter()

const seleccionarCategoria = (categoria) => {
  estadoJuego.categoriaSeleccionada = categoria
  router.push('/difficulty')
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
  color: #e94560;
  font-family: 'Courier New', monospace;
}

h1 {
  font-family: 'Impact', sans-serif;
  font-size: 2.5em;
  color: #feca57;
  text-shadow: 2px 2px 0px #e94560;
  margin-bottom: 20px;
  text-align: center;
}

p {
  font-family: 'Courier New', monospace;
  font-size: 1.2em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
  margin-bottom: 2rem;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
}

.category-card {
  background: rgba(15, 52, 96, 0.9);
  border: 3px solid #e94560;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  color: #feca57;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(233, 69, 96, 0.8);
  border-color: #feca57;
}

.category-card .q-card-section {
  padding: 20px;
  text-align: center;
}

.category-card .text-h6 {
  font-family: 'Impact', sans-serif;
  font-size: 1.8em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
  margin-bottom: 10px;
}

.category-card .text-subtitle2 {
  color: #e94560;
  font-weight: bold;
  font-size: 1em;
}

.category-card .q-card-actions {
  padding: 16px 20px;
  justify-content: center;
}

.select-btn {
  background: linear-gradient(45deg, #e94560, #feca57);
  border: 2px solid #e94560;
  color: #1a1a2e;
  font-weight: bold;
  font-family: 'Impact', sans-serif;
  box-shadow: 0 0 10px rgba(233, 69, 96, 0.3);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(233, 69, 96, 0.6);
  background: linear-gradient(45deg, #feca57, #e94560);
}
</style>
