import { reactive } from 'vue'

// Datos de palabras por categoría con pistas
const palabrasPorCategoria = {
  animales: [
    { palabra: 'gato', pista: 'Animal doméstico que maúlla' },
    { palabra: 'perro', pista: 'El mejor amigo del hombre' },
    { palabra: 'elefante', pista: 'Animal grande con trompa' },
    { palabra: 'leon', pista: 'Rey de la selva' },
    { palabra: 'tigre', pista: 'Felino con rayas' },
    { palabra: 'oso', pista: 'Animal grande que hiberna' },
    { palabra: 'conejo', pista: 'Animal pequeño con orejas largas' },
    { palabra: 'pajaro', pista: 'Animal que vuela y canta' }
  ],
  frutas: [
    { palabra: 'manzana', pista: 'Fruta roja o verde, crujiente' },
    { palabra: 'platano', pista: 'Fruta amarilla, curva' },
    { palabra: 'naranja', pista: 'Fruta cítrica, redonda' },
    { palabra: 'uva', pista: 'Fruta pequeña, en racimos' },
    { palabra: 'pera', pista: 'Fruta con forma de campana' },
    { palabra: 'sandia', pista: 'Fruta grande, verde por fuera, roja por dentro' },
    { palabra: 'melon', pista: 'Fruta redonda, dulce y jugosa' },
    { palabra: 'fresa', pista: 'Fruta pequeña, roja y dulce' }
  ],
  paises: [
    { palabra: 'españa', pista: 'País en Europa con toros y flamenco' },
    { palabra: 'francia', pista: 'País famoso por la Torre Eiffel' },
    { palabra: 'italia', pista: 'País con forma de bota, pizza y pasta' },
    { palabra: 'alemania', pista: 'País europeo con cerveza y salchichas' },
    { palabra: 'brasil', pista: 'País sudamericano con samba y fútbol' },
    { palabra: 'mexico', pista: 'País con pirámides y tacos' },
    { palabra: 'argentina', pista: 'País sudamericano con tango y gauchos' },
    { palabra: 'colombia', pista: 'País con café y emeraldes' }
  ],
  colores: [
    { palabra: 'rojo', pista: 'Color de la sangre y el fuego' },
    { palabra: 'azul', pista: 'Color del cielo y el mar' },
    { palabra: 'verde', pista: 'Color de la hierba y los árboles' },
    { palabra: 'amarillo', pista: 'Color del sol y los limones' },
    { palabra: 'morado', pista: 'Color de las uvas y las violetas' },
    { palabra: 'rosa', pista: 'Color de las flores y el algodón de azúcar' },
    { palabra: 'negro', pista: 'Color de la noche y el carbón' },
    { palabra: 'blanco', pista: 'Color de la nieve y la leche' }
  ]
}

// Estado del juego
const estadoJuego = reactive({
  categoriaSeleccionada: null,
  dificultadSeleccionada: null,
  palabraActual: '',
  pistaActual: '',
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
    const palabraSeleccionada = seleccionarPalabraAleatoria(estadoJuego.categoriaSeleccionada, estadoJuego.dificultadSeleccionada)
    estadoJuego.palabraActual = palabraSeleccionada.palabra
    estadoJuego.pistaActual = palabraSeleccionada.pista
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
      palabrasFiltradas = palabras.filter(p => p.palabra.length <= 5)
    } else if (dificultad === 'medio') {
      palabrasFiltradas = palabras.filter(p => p.palabra.length > 5 && p.palabra.length <= 8)
    } else if (dificultad === 'dificil') {
      palabrasFiltradas = palabras.filter(p => p.palabra.length > 8)
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
    estadoJuego.pistaActual = ''
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
