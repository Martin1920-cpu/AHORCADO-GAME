<template>
  <q-page class="flex flex-center column q-gutter-md">
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

const router = useRouter()

const seleccionarDificultad = (dificultad) => {
  window.estadoJuego.dificultadSeleccionada = dificultad
  iniciarJuego()
  router.push('/game')
}

// Iniciar nuevo juego
const iniciarJuego = () => {
  window.estadoJuego.palabraActual = seleccionarPalabraAleatoria(window.estadoJuego.categoriaSeleccionada, window.estadoJuego.dificultadSeleccionada)
  window.estadoJuego.letrasAdivinadas = []
  window.estadoJuego.intentosFallidos = 0
  window.estadoJuego.juegoTerminado = false
  window.estadoJuego.ganado = false
  window.estadoJuego.tiempoInicio = Date.now()
  window.estadoJuego.tiempoFin = null
}

// Seleccionar palabra aleatoria basada en categoría y dificultad
const seleccionarPalabraAleatoria = (categoria, dificultad) => {
  const palabras = window.palabrasPorCategoria[categoria]
  let palabrasFiltradas = palabras

  if (dificultad === 'facil') {
    palabrasFiltradas = palabras.filter(p => p.length <= 5)
  } else if (dificultad === 'medio') {
    palabrasFiltradas = palabras.filter(p => p.length > 5 && p.length <= 8)
  } else if (dificultad === 'dificil') {
    palabrasFiltradas = palabras.filter(p => p.length > 8)
  }

  if (palabrasFiltradas.length === 0) palabrasFiltradas = palabras

  const indiceAleatorio = Math.floor(Math.random() * palabrasFiltradas.length)
  return palabrasFiltradas[indiceAleatorio]
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
