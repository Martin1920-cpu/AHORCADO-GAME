<template>
  <q-page class="flex flex-center column q-gutter-lg q-pa-lg">
    <div class="title-container">
      <h1 class="arcade-title">AHORCADO</h1>
      <div class="subtitle">Juego del Ahorcado</div>
    </div>

    <div class="start-container">
      <q-btn
        class="start-btn"
        label="INICIAR JUEGO"
        to="/categories"
        size="lg"
      />
    </div>

    <div class="instructions">
      <p>¡Adivina la palabra antes de que se complete el dibujo!</p>
      <p>Elige una categoría y dificultad para comenzar.</p>
    </div>
  </q-page>
</template>

<script setup>
// No script needed for this simple view
</script>

<style scoped>
.q-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title-container {
  margin-bottom: 2rem;
}

.arcade-title {
  font-family: 'Impact', sans-serif;
  font-size: 4em;
  color: #feca57;
  text-shadow: 3px 3px 0px #e94560, 6px 6px 0px #0f3460;
  margin: 0;
  letter-spacing: 0.1em;
  animation: glow 2s ease-in-out infinite alternate;
}

.subtitle {
  font-family: 'Courier New', monospace;
  font-size: 1.2em;
  color: #e94560;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.start-container {
  margin: 2rem 0;
}

.start-btn {
  background: linear-gradient(45deg, #e94560, #feca57);
  border: 4px solid #e94560;
  color: #1a1a2e;
  font-weight: bold;
  font-family: 'Impact', sans-serif;
  font-size: 1.2em;
  padding: 1rem 2rem;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.start-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(233, 69, 96, 0.8);
  background: linear-gradient(45deg, #feca57, #e94560);
}

.instructions {
  max-width: 600px;
  margin-top: 2rem;
}

.instructions p {
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  color: #feca57;
  margin: 0.5rem 0;
  text-shadow: 1px 1px 0px #e94560;
}

@keyframes glow {
  from {
    text-shadow: 3px 3px 0px #e94560, 6px 6px 0px #0f3460;
  }
  to {
    text-shadow: 3px 3px 0px #e94560, 6px 6px 0px #0f3460, 0 0 10px rgba(254, 202, 87, 0.5);
  }
}
</style>
