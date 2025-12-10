<template>
  <q-page class="flex flex-center column q-gutter-sm q-pa-sm">
    <!-- Dibujo -->
    <div class="hangman-drawing">
      <pre>{{ dibujoAhorcado }}</pre>
    </div>

    <!-- Información del juego -->
    <div class="game-info">
      <q-chip color="primary" text-color="white" icon="category">
        Categoría: {{ categoriaFormateada }}
      </q-chip>
      <q-chip color="secondary" text-color="white" icon="star">
        Dificultad: {{ dificultadFormateada }}
      </q-chip>
      <q-chip color="warning" text-color="white" icon="error">
        Intentos restantes: {{ intentosRestantes }}
      </q-chip>
    </div>

    <!-- Progreso de la palabra -->
    <div class="word-progress">
      <h2>Palabra:</h2>
      <div class="word-letters">
        <q-chip
          v-for="(letra, index) in palabraMostrada"
          :key="index"
          :color="letra === '_' ? 'grey' : 'positive'"
          text-color="white"
          size="lg"
          class="letter-chip"
        >
          {{ letra }}
        </q-chip>
      </div>
    </div>

    <!-- Letras adivinadas -->
    <div class="guessed-letters">
      <div class="letters-grid">
        <q-chip
          v-for="letra in letrasOrdenadas"
          :key="letra"
          :color="palabraActual.includes(letra) ? 'positive' : 'negative'"
          text-color="white"
        >
          {{ letra.toUpperCase() }}
        </q-chip>
      </div>
    </div>

    <!-- Teclado virtual -->
    <div v-if="!juegoTerminado" class="keyboard-section">
      <div class="keyboard">
        <q-btn
          v-for="letra in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
          :key="letra"
          :label="letra"
          :color="letraUsada(letra) ? 'grey' : 'primary'"
          :disable="letraUsada(letra)"
          @click="adivinarLetra(letra.toLowerCase())"
          class="keyboard-btn"
          size="md"
        />
      </div>
    </div>

    <!-- Mensaje de fin de juego -->
    <div v-if="juegoTerminado" class="game-end">
      <q-card class="q-pa-md" :class="ganado ? 'bg-positive' : 'bg-negative'">
        <q-card-section>
          <div class="text-h6">{{ ganado ? '¡Ganaste!' : '¡Perdiste!' }}</div>
          <div class="text-subtitle2">
            La palabra era: {{ palabraActual.toUpperCase() }}
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            :color="ganado ? 'positive' : 'negative'"
            label="Ir al Scoreboard"
            @click="$router.push('/scoreboard')"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState.js'

const { estadoJuego, adivinarLetra, calcularTiempoJugado, guardarPuntuacion } = useGameState()
const router = useRouter()
const letraInput = ref('')

// Computed properties
const categoriaFormateada = computed(() => {
  const categorias = {
    animales: 'Animales',
    frutas: 'Frutas',
    paises: 'Países',
    colores: 'Colores'
  }
  return categorias[estadoJuego.categoriaSeleccionada] || 'Desconocida'
})

const dificultadFormateada = computed(() => {
  const dificultades = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil'
  }
  return dificultades[estadoJuego.dificultadSeleccionada] || 'Desconocida'
})

const intentosRestantes = computed(() => {
  return estadoJuego.maxIntentos - estadoJuego.intentosFallidos
})

const palabraActual = computed(() => estadoJuego.palabraActual)
const letrasAdivinadas = computed(() => estadoJuego.letrasAdivinadas)
const juegoTerminado = computed(() => estadoJuego.juegoTerminado)
const ganado = computed(() => estadoJuego.ganado)

const palabraMostrada = computed(() => {
  return palabraActual.value.split('').map(letra =>
    letrasAdivinadas.value.includes(letra) ? letra.toUpperCase() : '_'
  )
})

const letrasOrdenadas = computed(() => {
  return [...letrasAdivinadas.value].sort()
})

const letraUsada = (letra) => {
  return letrasAdivinadas.value.includes(letra.toLowerCase())
}

const dibujoAhorcado = computed(() => {
  const dibujos = [
    `
   +---+
   |   |
       |
       |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
       |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
   |   |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|   |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`
  ]
  return dibujos[estadoJuego.intentosFallidos]
})

// Funciones


onMounted(() => {
  if (!estadoJuego.palabraActual) {
    router.push('/categories')
  }
})
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

.hangman-drawing {
  font-family: 'Courier New', monospace;
  font-size: 1.5em;
  text-align: center;
  margin: 20px 0;
  background: #0f3460;
  border: 3px solid #e94560;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  color: #feca57;
}

.game-info {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
}

.word-progress {
  text-align: center;
  margin: 20px 0;
}

.word-progress h2 {
  font-family: 'Impact', sans-serif;
  font-size: 1.8em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
}

.word-letters {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px 0;
}

.letter-chip {
  font-size: 1.8em;
  min-width: 50px;
  height: 50px;
  font-weight: bold;
  border: 2px solid #e94560;
  box-shadow: 0 0 10px rgba(233, 69, 96, 0.3);
  transition: all 0.3s ease;
}

.letter-chip:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(233, 69, 96, 0.5);
}

.guessed-letters {
  text-align: center;
  margin: 20px 0;
}

.guessed-letters h3 {
  font-family: 'Impact', sans-serif;
  font-size: 1.5em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
}

.letters-grid {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px 0;
}

.keyboard-section {
  text-align: center;
  margin: 20px 0;
}

.keyboard-section h3 {
  font-family: 'Impact', sans-serif;
  font-size: 1.5em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
  max-width: 350px;
  margin: 0 auto;
}

.keyboard-btn {
  min-width: 45px;
  height: 45px;
  font-size: 1em;
  font-weight: bold;
  border: 2px solid #e94560;
  box-shadow: 0 0 10px rgba(233, 69, 96, 0.3);
  transition: all 0.2s ease;
}

.keyboard-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(233, 69, 96, 0.6);
}

.keyboard-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.game-end {
  width: 100%;
  max-width: 450px;
  margin: 20px 0;
}

.game-end .q-card {
  border: 3px solid #e94560;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
}

.game-end .q-card .text-h6 {
  font-family: 'Impact', sans-serif;
  font-size: 1.8em;
  color: #feca57;
  text-shadow: 1px 1px 0px #e94560;
}
</style>
