<template>
  <q-page class="flex flex-center column q-gutter-md q-pa-md">
    <h1>Resultados del Juego</h1>

    <!-- Resultado del juego actual -->
    <q-card class="q-pa-md" :class="ganado ? 'bg-positive' : 'bg-negative'" style="width: 100%; max-width: 500px">
      <q-card-section>
        <div class="text-h6">{{ ganado ? '¡Ganaste!' : '¡Perdiste!' }}</div>
        <div class="text-subtitle2">
          La palabra era: {{ palabraActual.toUpperCase() }}
        </div>
        <div class="text-body2">
          Categoría: {{ categoriaFormateada }} | Dificultad: {{ dificultadFormateada }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Estadísticas -->
    <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
      <q-card-section>
        <div class="text-h6">Estadísticas</div>
        <div class="q-gutter-sm">
          <q-chip color="info" text-color="white" icon="schedule">
            Tiempo: {{ tiempoFormateado }}
          </q-chip>
          <q-chip color="warning" text-color="white" icon="error">
            Intentos fallidos: {{ intentosFallidos }}
          </q-chip>
          <q-chip color="secondary" text-color="white" icon="star">
            Puntuación: {{ puntuacion }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>

    <!-- Historial de puntuacionessssss -->
    <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
      <q-card-section>
        <div class="text-h6">Historial de Puntuaciones</div>
        <q-list>
          <q-item v-for="(puntuacion, index) in puntuaciones.slice(0, 5)" :key="index">
            <q-item-section>
              <q-item-label>{{ formatearCategoria(puntuacion.categoria) }} - {{ formatearDificultad(puntuacion.dificultad) }}</q-item-label>
              <q-item-label caption>
                {{ puntuacion.ganado ? 'Ganado' : 'Perdido' }} | Tiempo: {{ formatearTiempo(puntuacion.tiempo) }} | Puntuación: {{ puntuacion.puntuacion }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Botones -->
    <div class="q-gutter-sm">
      <q-btn
        color="primary"
        label="Jugar de Nuevo"
        @click="jugarDeNuevo"
      />
      <q-btn
        color="grey"
        label="Volver al Inicio"
        @click="$router.push('/')"
        flat
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState.js'

const { estadoJuego, calcularTiempoJugado, obtenerPuntuaciones, reiniciarEstado } = useGameState()
const router = useRouter()

// propiedades
const ganado = computed(() => estadoJuego.ganado)
const palabraActual = computed(() => estadoJuego.palabraActual)
const intentosFallidos = computed(() => estadoJuego.intentosFallidos)
const puntuacion = computed(() => {
  const tiempo = calcularTiempoJugado()
  return ganado.value ? (6 - intentosFallidos.value) * 100 - tiempo : 0
})

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

const tiempoFormateado = computed(() => {
  const tiempo = calcularTiempoJugado()
  const minutos = Math.floor(tiempo / 60)
  const segundos = tiempo % 60
  return `${minutos}:${segundos.toString().padStart(2, '0')}`
})

const puntuaciones = ref([])

// Funciones
const formatearCategoria = (categoria) => {
  const categorias = {
    animales: 'Animales',
    frutas: 'Frutas',
    paises: 'Países',
    colores: 'Colores'
  }
  return categorias[categoria] || 'Desconocida'
}

const formatearDificultad = (dificultad) => {
  const dificultades = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil'
  }
  return dificultades[dificultad] || 'Desconocida'
}

const formatearTiempo = (tiempo) => {
  const minutos = Math.floor(tiempo / 60)
  const segundos = tiempo % 60
  return `${minutos}:${segundos.toString().padStart(2, '0')}`
}

const jugarDeNuevo = () => {
  reiniciarEstado()
  router.push('/categories')
}

const cargarPuntuaciones = () => {
  puntuaciones.value = obtenerPuntuaciones()
  //puntuación descendente
  puntuaciones.value.sort((a, b) => b.puntuacion - a.puntuacion)
}

onMounted(() => {
  cargarPuntuaciones()
})
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

.q-card {
  background: rgba(15, 52, 96, 0.9);
  border: 3px solid #e94560;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  color: #feca57;
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

.q-chip {
  background: rgba(254, 202, 87, 0.1);
  border: 2px solid #e94560;
  color: #feca57;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(233, 69, 96, 0.3);
  transition: all 0.3s ease;
}

.q-chip:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(233, 69, 96, 0.5);
}

.q-list {
  background: rgba(15, 52, 96, 0.8);
  border-radius: 8px;
  padding: 10px;
}

.q-item {
  border-bottom: 1px solid #e94560;
  padding: 10px 0;
  transition: background 0.3s ease;
}

.q-item:hover {
  background: rgba(233, 69, 96, 0.1);
}

.q-item-label {
  color: #feca57;
  font-weight: bold;
}

.q-item-label.caption {
  color: #e94560;
  font-size: 0.9em;
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
