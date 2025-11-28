<template>
  <q-page class="flex flex-center column q-gutter-md q-pa-md">
    <h1>Juego del Ahorcado</h1>

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
      <h3>Letras usadas:</h3>
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

    <!-- Input para adivinar letra -->
    <div v-if="!juegoTerminado" class="input-section">
      <q-input
        v-model="letraInput"
        label="Ingresa una letra"
        maxlength="1"
        @keyup.enter="adivinarLetra"
        :rules="[val => val.length === 1 || 'Ingresa solo una letra']"
      />
      <q-btn
        color="primary"
        label="Adivinar"
        @click="adivinarLetra"
        :disable="!letraInput || letraInput.length !== 1"
      />
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
  return categorias[window.estadoJuego.categoriaSeleccionada] || 'Desconocida'
})

const dificultadFormateada = computed(() => {
  const dificultades = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil'
  }
  return dificultades[window.estadoJuego.dificultadSeleccionada] || 'Desconocida'
})

const intentosRestantes = computed(() => {
  return window.estadoJuego.maxIntentos - window.estadoJuego.intentosFallidos
})

const palabraActual = computed(() => window.estadoJuego.palabraActual)
const letrasAdivinadas = computed(() => window.estadoJuego.letrasAdivinadas)
const juegoTerminado = computed(() => window.estadoJuego.juegoTerminado)
const ganado = computed(() => window.estadoJuego.ganado)

const palabraMostrada = computed(() => {
  return palabraActual.value.split('').map(letra =>
    letrasAdivinadas.value.includes(letra) ? letra.toUpperCase() : '_'
  ).join(' ')
})

const letrasOrdenadas = computed(() => {
  return [...letrasAdivinadas.value].sort()
})

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
  return dibujos[window.estadoJuego.intentosFallidos]
})

// Funciones
const adivinarLetra = () => {
  if (!letraInput.value || juegoTerminado.value) return

  const letra = letraInput.value.toLowerCase()
  letraInput.value = ''

  if (letrasAdivinadas.value.includes(letra)) return

  window.estadoJuego.letrasAdivinadas.push(letra)

  if (!palabraActual.value.includes(letra)) {
    window.estadoJuego.intentosFallidos++
  }

  verificarEstadoJuego()
}

const verificarEstadoJuego = () => {
  const palabraAdivinada = palabraActual.value.split('').every(letra =>
    letrasAdivinadas.value.includes(letra)
  )

  if (palabraAdivinada) {
    window.estadoJuego.juegoTerminado = true
    window.estadoJuego.ganado = true
    window.estadoJuego.tiempoFin = Date.now()
    guardarPuntuacion()
  } else if (window.estadoJuego.intentosFallidos >= window.estadoJuego.maxIntentos) {
    window.estadoJuego.juegoTerminado = true
    window.estadoJuego.ganado = false
    window.estadoJuego.tiempoFin = Date.now()
  }
}

const guardarPuntuacion = () => {
  const tiempo = calcularTiempoJugado()
  const puntuacion = window.estadoJuego.ganado ? (window.estadoJuego.maxIntentos - window.estadoJuego.intentosFallidos) * 100 - tiempo : 0

  const puntuaciones = JSON.parse(localStorage.getItem('puntuacionesAhorcado') || '[]')
  puntuaciones.push({
    categoria: window.estadoJuego.categoriaSeleccionada,
    dificultad: window.estadoJuego.dificultadSeleccionada,
    ganado: window.estadoJuego.ganado,
    tiempo: tiempo,
    puntuacion: puntuacion,
    fecha: new Date().toISOString()
  })

  // Mantener solo las últimas 10 puntuaciones
  if (puntuaciones.length > 10) {
    puntuaciones.shift()
  }

  localStorage.setItem('puntuacionesAhorcado', JSON.stringify(puntuaciones))
}

const calcularTiempoJugado = () => {
  if (!window.estadoJuego.tiempoInicio || !window.estadoJuego.tiempoFin) return 0
  return Math.floor((window.estadoJuego.tiempoFin - window.estadoJuego.tiempoInicio) / 1000)
}

onMounted(() => {
  if (!window.estadoJuego.palabraActual) {
    router.push('/categories')
  }
})
</script>

<style scoped>
.hangman-drawing {
  font-family: monospace;
  font-size: 1.2em;
  text-align: center;
  margin: 20px 0;
}

.game-info {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.word-progress {
  text-align: center;
}

.word-letters {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
}

.letter-chip {
  font-size: 1.5em;
  min-width: 40px;
}

.guessed-letters {
  text-align: center;
}

.letters-grid {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
}

.input-section {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.game-end {
  width: 100%;
  max-width: 400px;
}

.q-page {
  min-height: 100vh;
}
</style>
