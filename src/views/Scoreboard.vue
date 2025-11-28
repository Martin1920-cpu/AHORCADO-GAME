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

const router = useRouter()

// propiedades
const ganado = computed(() => window.estadoJuego.ganado)
const palabraActual = computed(() => window.estadoJuego.palabraActual)
const intentosFallidos = computed(() => window.estadoJuego.intentosFallidos)
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

const tiempoFormateado = computed(() => {
  const tiempo = calcularTiempoJugado()
  const minutos = Math.floor(tiempo / 60)
  const segundos = tiempo % 60
  return `${minutos}:${segundos.toString().padStart(2, '0')}`
})

const puntuaciones = ref([])

// Funciones
const calcularTiempoJugado = () => {
  if (!window.estadoJuego.tiempoInicio || !window.estadoJuego.tiempoFin) return 0
  return Math.floor((window.estadoJuego.tiempoFin - window.estadoJuego.tiempoInicio) / 1000)
}

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
  // Reiniciar
  window.estadoJuego.categoriaSeleccionada = null
  window.estadoJuego.dificultadSeleccionada = null
  window.estadoJuego.palabraActual = ''
  window.estadoJuego.letrasAdivinadas = []
  window.estadoJuego.intentosFallidos = 0
  window.estadoJuego.juegoTerminado = false
  window.estadoJuego.ganado = false
  window.estadoJuego.tiempoInicio = null
  window.estadoJuego.tiempoFin = null

  router.push('/categories')
}

const cargarPuntuaciones = () => {
  puntuaciones.value = JSON.parse(localStorage.getItem('puntuacionesAhorcado') || '[]')
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
}
</style>
