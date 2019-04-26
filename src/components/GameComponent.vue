<template>
  <div class="gameContent">
    <b-container v-if="gameNum === 1 || gameNum === 2">
      <h1>Game {{ gameNum }}</h1>
      <h2>{{ title }}</h2>
      <b-form-input @keypress.enter="getCalcGuess" :value="guess" type="number" min="0" max="99"></b-form-input>
      <h1>Total Guesses: {{ count }}</h1>
      <b-alert
        v-if="currentStatement && !currentStatement.includes('You got it in')"
        show
      >{{ currentStatement }}</b-alert>
      <b-alert
        v-else-if="currentStatement.includes('You got it in')"
        variant="success"
        show
      >{{ currentStatement }}</b-alert>
    </b-container>
    <b-container v-else-if="gameNum === 3 || gameNum === 4">
      <h1>Game {{ gameNum }}</h1>
      <button v-if="!currentStatement" @click="getCalcGuess">START</button>
      <h1 v-if="currentStatement">Was this your number?</h1>
      <b-alert v-if="currentStatement" :variant="correctStatus" show>{{ currentStatement }}</b-alert>
      <button v-if="currentStatement" @click="tryLower">Try Lower</button>
      <button v-if="currentStatement" @click="alterCorrect">Correct</button>
      <button v-if="currentStatement" @click="tryHigher">Try Higher</button>

      <h1>Total Guesses: {{ count }}</h1>
    </b-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      correctStatus: "info"
    };
  },
  methods: {
    alterCorrect() {
      if (!this.currentStatement) {
        this.correctStatus = "info";
      } else {
        this.correctStatus = "success";
      }
    }
  },
  props: {
    title: String,
    guess: Number,
    currentStatement: String,
    count: Number,
    gameNum: Number,
    getCalcGuess: Function,
    tryHigher: Function,
    tryLower: Function
  }
};
</script>

<style scoped>
.gameContent {
  text-align: center;
  margin: 0 auto;
}
</style>
