<template>
  <div class="gameContent">
    <b-container>
      <h1>Game {{ gameNum }}</h1>
      <h2>{{ title }}</h2>
      <b-form-input @keypress.enter="getCalcGuess" :value="guess" type="number" min="0" max="99"></b-form-input>
      <h1>Total Guesses: {{ count }}</h1>
      <b-alert
        v-if="currentStatement.length > 0 && !currentStatement.includes('You got it in')"
        show
      >{{ currentStatement }}</b-alert>
      <b-alert
        v-else-if="currentStatement.includes('You got it in')"
        variant="success"
        show
      >{{ currentStatement }}</b-alert>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    guess: Number,
    currentStatement: String,
    count: Number,
    gameNum: Number,
    getCalcGuess: Function
  }
};
</script>

<style scoped>
.gameContent {
  text-align: center;
  margin: 0 auto;
}
</style>
