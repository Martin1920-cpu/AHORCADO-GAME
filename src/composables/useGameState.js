import { reactive } from 'vue'

// Datos de palabras por categoría
const palabrasPorCategoria = {
  animales: ['gato', 'perro', 'elefante', 'leon', 'tigre', 'oso', 'conejo', 'pajaro'],
  frutas: ['manzana', 'platano', 'naranja', 'uva', 'pera', 'sandia', 'melon', 'fresa'],
  paises: ['espana', 'francia', 'italia', 'alemania', 'brasil', 'mexico', 'argentina', 'colombia'],
  colores: ['rojo', 'azul', 'verde', 'amarillo', 'morado', 'rosa', 'negro', 'blanco']
}

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

// Funciones para manejar el estado
export function useGameState() {
  // Iniciar nuevo juego
  const iniciarJuego = () => {
    estadoJuego.palabraActual = seleccionarPalabraAleatoria(estadoJuego.categoriaSeleccionada, estadoJuego.dificultadSeleccionada)
    estadoJuego.letrasAdivinadas = []
    estadoJuego.intentosFallidos = 0
    estadoJuego.juegoTerminado = false
    estadoJuego.ganado = false
    estadoJuego.tiempoInicio = Date.now()
    estadoJuego.tiempoFin = null
  }

  // Seleccionar palabra aleatoria basada en categoría y dificultad
  const seleccionarPalabraAleatoria = (categoria, dificultad) => {
    const palabras = palabrasPorCategoria[categoria]
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

  // Adivinar letra
  const adivinarLetra = (letra) => {
    if (estadoJuego.juegoTerminado) return

    letra = letra.toLowerCase()
    if (estadoJuego.letrasAdivinadas.includes(letra)) return

    estadoJuego.letrasAdivinadas.push(letra)

    if (!estadoJuego.palabraActual.includes(letra)) {
      estadoJuego.intentosFallidos++
    }

    verificarEstadoJuego()
  }

  // Verificar si el juego terminó
  const verificarEstadoJuego = () => {
    const palabraAdivinada = estadoJuego.palabraActual.split('').every(letra =>
      estadoJuego.letrasAdivinadas.includes(letra)
    )

    if (palabraAdivinada) {
      estadoJuego.juegoTerminado = true
      estadoJuego.ganado = true
      estadoJuego.tiempoFin = Date.now()
      guardarPuntuacion()
    } else if (estadoJuego.intentosFallidos >= estadoJuego.maxIntentos) {
      estadoJuego.juegoTerminado = true
      estadoJuego.ganado = false
      estadoJuego.tiempoFin = Date.now()
    }
  }

  // Calcular tiempo jugado
  const calcularTiempoJugado = () => {
    if (!estadoJuego.tiempoInicio || !estadoJuego.tiempoFin) return 0
    return Math.floor((estadoJuego.tiempoFin - estadoJuego.tiempoInicio) / 1000)
  }

  // Guardar puntuación en localStorage
  const guardarPuntuacion = () => {
    const tiempo = calcularTiempoJugado()
    const puntuacion = estadoJuego.ganado ? (estadoJuego.maxIntentos - estadoJuego.intentosFallidos) * 100 - tiempo : 0

    const puntuaciones = JSON.parse(localStorage.getItem('puntuacionesAhorcado') || '[]')
    puntuaciones.push({
      categoria: estadoJuego.categoriaSeleccionada,
      dificultad: estadoJuego.dificultadSeleccionada,
      ganado: estadoJuego.ganado,
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

  // Obtener puntuaciones del localStorage
  const obtenerPuntuaciones = () => {
    return JSON.parse(localStorage.getItem('puntuacionesAhorcado') || '[]')
  }

  // Reiniciar estado
  const reiniciarEstado = () => {
    estadoJuego.categoriaSeleccionada = null
    estadoJuego.dificultadSeleccionada = null
    estadoJuego.palabraActual = ''
    estadoJuego.letrasAdivinadas = []
    estadoJuego.intentosFallidos = 0
    estadoJuego.tiempoInicio = null
    estadoJuego.tiempoFin = null
    estadoJuego.juegoTerminado = false
    estadoJuego.ganado = false
  }

  return {
    estadoJuego,
    iniciarJuego,
    adivinarLetra,
    calcularTiempoJugado,
    guardarPuntuacion,
    obtenerPuntuaciones,
    reiniciarEstado
  }
}
