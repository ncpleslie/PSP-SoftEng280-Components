<template>
  <div>
    <b-jumbotron header="Software Engineering 2 Assignment 1" :lead="leadString">
      <p>PSP Assignment - Nick Leslie</p>
    </b-jumbotron>
    <b-container>
      <b-card no-body>
        <b-tabs card>
          <b-tab
            v-for="aGame in game"
            :title="gameTitle(aGame.getGameNumber().toString())"
            :key="aGame.getGameNumber()"
            @click="pickGameNumber(aGame.getGameNumber())"
          >
            <b-card-text>
              <GameComponent
                :title="title"
                :guess="guess"
                :currentStatement="currentStatement"
                :count="count"
                :gameNum="gameNum"
                :getCalcGuess="getCalcGuess"
              ></GameComponent>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import GameComponent from "./components/GameComponent";

export default {
  data: function() {
    return {
      title: "Guess a number",
      guess: null,
      currentStatement: "",
      game: [new GameOne(this.guess, 1), new GameTwo(this.guess, 2)],
      count: 0,
      gameNum: 1
    };
  },
  computed: {
    leadString: function() {
      return "Game Number " + this.gameNum;
    }
  },
  methods: {
    gameTitle(number) {
      return `Guessing Game ${number}`;
    },
    getCalcGuess(event) {
      console.log(this.game[this.gameNum - 1].getRandomNum());
      this.currentStatement = this.game[this.gameNum - 1].calcGuess(event);
      this.count = this.game[this.gameNum - 1].getCount();
      this.guess = this.game[this.gameNum - 1].getGuess();
    },
    pickGameNumber(gameNumber) {
      this.gameNum = gameNumber;
      this.resetElements();
    },
    resetElements() {
      this.guess = null;
      this.currentStatement = "";
      this.count = 0;
      this.game[this.gameNum - 1].resetRandNum();
    }
  },
  components: {
    GameComponent
  }
};
// eslint-disable-next-line no-unused-vars
class Game {
  constructor(newGuess, gameNumber) {
    this.randomNum = Math.floor(Math.random() * 99);
    this.guess = newGuess;
    this.count = 0;
    this.gameNumber = gameNumber;
  }

  getDifference(a, b) {
    return Math.abs(a - b);
  }

  getRandomNum() {
    return this.randomNum;
  }

  getCount() {
    return this.count;
  }

  getGuess() {
    return this.guess;
  }

  getGameNumber() {
    return this.gameNumber;
  }

  resetRandNum() {
    this.randomNum = Math.floor(Math.random() * 99);
  }
}

class GameOne extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value);
    if (this.guess) {
      this.count++;
      if (this.guess > 99) this.guess = 99;
      if (this.guess < this.randomNum) return "Try Higher";
      if (this.guess > this.randomNum) return "Try Lower";
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`;
      }
    } else {
      return "Please input a number";
    }
  }
}

class GameTwo extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value);
    if (this.guess) {
      this.count++;
      if (this.guess > 99) this.guess = 99;
      if (this.guess < 1) this.guess = 1;
      let difference = this.getDifference(this.guess, this.randomNum);
      if (difference >= 40) return "COLD";
      if (difference >= 20 && difference <= 39) return "COOL";
      if (difference >= 10 && difference <= 19) return "WARM";
      if (difference >= 1 && difference <= 9) return "HOT";
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`;
      }
    } else {
      return "Please input a number";
    }
  }
}
</script>

<style>
</style>
