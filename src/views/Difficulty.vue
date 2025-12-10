<template>
  <q-page class="flex flex-center column q-gutter-sm q-pa-sm">
    <h1>Seleccionar Dificultad</h1>
    <p>Elige el nivel de dificultad para el juego:</p>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Fácil</div>
        <div class="text-subtitle2">Palabras cortas (hasta 5 letras)</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="green"
          label="Seleccionar"
          @click="seleccionarDificultad('facil')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Medio</div>
        <div class="text-subtitle2">Palabras medianas (6-8 letras)</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="orange"
          label="Seleccionar"
          @click="seleccionarDificultad('medio')"
        />
      </q-card-actions>
    </q-card>

    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Difícil</div>
        <div class="text-subtitle2">Palabras largas (más de 8 letras)</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="red"
          label="Seleccionar"
          @click="seleccionarDificultad('dificil')"
        />
      </q-card-actions>
    </q-card>

    <q-btn
      color="grey"
      label="Volver a Categorías"
      @click="$router.push('/categories')"
      flat
    />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState.js'

const { estadoJuego, iniciarJuego, seleccionarPalabraAleatoria } = useGameState()
const router = useRouter()

const seleccionarDificultad = (dificultad) => {
  estadoJuego.dificultadSeleccionada = dificultad
  iniciarJuego()
  router.push('/game')
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #e94560;
  font-family: 'Courier New', monospace;
}

h1 {
  font-family: 'Impact', sans-serif;
  font-size: 2.5em;
  color: #feca57;
  text-shadow: 2px 2px 0px #e94560;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  color: #feca57;
  text-align: center;
  margin-bottom: 30px;
}

.q-card {
  background: rgba(15, 52, 96, 0.9);
  border: 3px solid #e94560;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  color: #feca57;
  transition: all 0.3s ease;
}

.q-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(233, 69, 96, 0.7);
}

.q-card-section {
  padding: 20px;
}

.text-h6 {
  font-family: 'Impact', sans-serif;
  font-size: 1.8em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
  margin-bottom: 10px;
}

.text-subtitle2 {
  color: #e94560;
  font-weight: bold;
}

.q-card-actions {
  padding: 16px 20px;
}

.q-btn {
  background: linear-gradient(45deg, #e94560, #feca57);
  border: 2px solid #e94560;
  color: #1a1a2e;
  font-weight: bold;
  font-family: 'Impact', sans-serif;
  box-shadow: 0 0 10px rgba(233, 69, 96, 0.3);
  transition: all 0.3s ease;
}

.q-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(233, 69, 96, 0.6);
}

.q-btn.flat {
  background: transparent;
  border: 2px solid #feca57;
  color: #feca57;
}

.q-btn.flat:hover {
  background: rgba(254, 202, 87, 0.1);
}
</style>
