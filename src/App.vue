<template>
  <div>
    <JumbotronComponent :leadString="leadString"></JumbotronComponent>
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
    <RulesComponent :rule="getGameRules()"></RulesComponent>
  </div>
</template>

<script>
import JumbotronComponent from './components/JumbotronComponent'
import GameComponent from './components/GameComponent'
import RulesComponent from './components/RulesComponent'

export default {
  data: function() {
    return {
      title: 'Guess a number',
      guess: null,
      currentStatement: '',
      game: [new GameOne(this.guess, 1), new GameTwo(this.guess, 2), new GameThree(this.guess, 3), new GameFour(this.guess, 4)],
      count: 0,
      gameNum: 1
    }
  },
  computed: {
    leadString: function() {
      return `Game Number ${this.gameNum}`
    }
  },
  methods: {
    getGameRules() {
      return this.game[this.gameNum - 1].getRules()
    },
    gameTitle(number) {
      return `Guessing Game ${number}`
    },
    getCalcGuess(state) {
      //  console.log(this.game[this.gameNum - 1].getRandomNum())
      this.currentStatement = this.game[this.gameNum - 1].calcGuess(state)
      this.count = this.game[this.gameNum - 1].getCount()
      this.guess = this.game[this.gameNum - 1].getGuess()
    },
    pickGameNumber(gameNumber) {
      this.gameNum = gameNumber
      this.resetElements()
    },
    resetElements() {
      this.guess = null
      this.currentStatement = ''
      this.count = 0
      this.game[this.gameNum - 1].resetStatus()
    }
  },
  components: {
    JumbotronComponent,
    GameComponent,
    RulesComponent
  }
}
// eslint-disable-next-line no-unused-vars
class Game {
  constructor(newGuess, gameNumber) {
    this.highestNumber = 99
    this.lowestNumber = 1
    this.randomNum = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1) + this.lowestNumber)
    this.guess = newGuess
    this.count = 0
    this.gameNumber = gameNumber
  }

  getDifference(a, b) {
    return Math.abs(a - b)
  }

  getRandomNum() {
    return this.randomNum
  }

  getCount() {
    return this.count
  }

  getGuess() {
    return this.guess
  }

  getGameNumber() {
    return this.gameNumber
  }

  resetStatus() {
    this.randomNum = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1) + this.lowestNumber)
    this.count = 0
    this.highestNumber = 99
    this.lowestNumber = 1
    this.guess = null
  }
}

class GameOne extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value, 10)
    if (this.guess) {
      this.count++
      if (this.guess > this.highestNumber) this.guess = this.highestNumber
      if (this.guess < this.randomNum) return 'Try Higher'
      if (this.guess > this.randomNum) return 'Try Lower'
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`
      }
    } else {
      return 'Please input a number'
    }
  }

  getRules() {
    return 'Write a program to play a number guessing game. The program shall generate a random number between 0 and 99. The USER inputs his/her guess, and the program shall response with "Try higher", "Try lower" or "You got it in n trials" if the guess is correct'
  }
}

class GameTwo extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value, 10)
    if (this.guess) {
      this.count++
      if (this.guess > this.highestNumber) this.guess = this.highestNumber
      if (this.guess < this.lowestNumber) this.guess = this.lowestNumber
      let difference = this.getDifference(this.guess, this.randomNum)
      if (difference >= 40) return 'COLD'
      if (difference >= 20 && difference <= 39) return 'COOL'
      if (difference >= 10 && difference <= 19) return 'WARM'
      if (difference >= 1 && difference <= 9) return 'HOT'
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`
      }
    } else {
      return 'Please input a number'
    }
  }

  getRules() {
    return 'Write a program to play a number guessing game. The program shall generate a random number between 0 and 99. The USER inputs his/her guess, and the program shall response with "COLD" if the guess is more than 40 from the target number, "COOL" if the guess is within 20-39 of the target number, “WARM” if the guess is within 10-19 of the target number, “HOT” if the guess is within 1-9 of the target number or "You got it in n trials" if the guess is correct.'
  }
}

class GameThree extends Game {
  calcGuess(state) {
    this.count++
    if (this.guess == null) {
      this.guess = this.randomNum
      return this.getRandomNum().toString()
    }
    if (state === 'Higher') return this.tryHigher()
    if (state === 'Lower') return this.tryLower()
  }

  tryHigher() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.lowestNumber = this.guess
    let returningNumber = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1) + this.lowestNumber)
    this.guess = returningNumber
    return returningNumber.toString()
  }

  tryLower() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.highestNumber = this.guess
    let returningNumber = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1) + this.lowestNumber)
    this.guess = returningNumber
    return returningNumber.toString()
  }

  getRules() {
    return 'Write a program to play a number guessing game. The USER mentally selects a number between 0 and 99 and the computer ties to guess it. The computer outputs its guess, and the User response with "Try higher", "Try lower" or “correct”. The computer should keep count of the number of guesses. The computer should complain if the USER has lied.'
  }
}

class GameFour extends Game {
  constructor(newGuess, gameNumber) {
    super(newGuess, gameNumber)
    this.storedNumState = {
      hotNum: null,
      warmNum: null,
      coolNum: null,
      coldNum: null
    }
  }
  calcGuess(state) {
    this.count++
    if (this.guess == null) {
      this.guess = this.randomNum
      return this.getRandomNum().toString()
    }
    if (state === 'COLD') return this.getCold()
    if (state === 'COOL') return this.getCool()
    if (state === 'WARM') return this.getWarm()
    if (state === 'HOT') return this.getHot()
  }

  getCold() {
    if (this.storedNumState.coolNum) return this.getCool()
    if (this.storedNumState.coldNum === null) this.storedNumState.coldNum = this.guess
    let differenceAmount = 99
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.coldNum, differenceAmount)
    //Check numbers are within range (0 to 99)
    this.checkedNumber = this.numberChecker(randNumInRange)
    this.guess = this.checkedNumber
    console.log(`Cold Function: Min: ${this.storedNumState.coldNum - differenceAmount} Max: ${this.storedNumState.coldNum + differenceAmount} Base Number: ${this.storedNumState.coldNum} Chosen Number: ${this.checkedNumber}`)
    return this.checkedNumber.toString()
  }

  getCool() {
    if (this.storedNumState.warmNum) return this.getWarm()
    if (this.storedNumState.coolNum === null) this.storedNumState.coolNum = this.guess
    let differenceAmount = 39
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.coolNum, differenceAmount)
    //Check numbers are within range (0 to 99)
    this.checkedNumber = this.numberChecker(randNumInRange)
    this.guess = this.checkedNumber
    console.log(`Cool Function: Min: ${this.storedNumState.coolNum - differenceAmount} Max: ${this.storedNumState.coolNum + differenceAmount} Base Number: ${this.storedNumState.coolNum} Chosen Number: ${this.checkedNumber}`)
    return this.checkedNumber.toString()
  }

  getWarm() {
    if (this.storedNumState.hotNum) return this.getHot()
    if (this.storedNumState.warmNum === null) this.storedNumState.warmNum = this.guess
    let differenceAmount = 19
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.warmNum, differenceAmount)
    //Check numbers are within range (0 to 99)
    this.checkedNumber = this.numberChecker(randNumInRange)
    this.guess = this.checkedNumber
    console.log(`Warm Function: Min: ${this.storedNumState.warmNum - differenceAmount} Max: ${this.storedNumState.warmNum + differenceAmount} Base Number: ${this.storedNumState.warmNum} Chosen Number: ${this.checkedNumber}`)
    return this.checkedNumber.toString()
  }

  getHot() {
    if (this.storedNumState.hotNum === null) this.storedNumState.hotNum = this.guess
    let differenceAmount = 9
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.hotNum, differenceAmount)
    console.log(randNumInRange)
    //Check numbers are within range (0 to 99)
    this.checkedNumber = this.numberChecker(randNumInRange)
    this.guess = this.checkedNumber
    console.log(`Hot Function: Min: ${this.storedNumState.hotNum - differenceAmount} Max: ${this.storedNumState.hotNum + differenceAmount} Base Number: ${this.storedNumState.hotNum} Chosen Number: ${this.checkedNumber}`)
    return this.checkedNumber.toString()
  }

  getRandNumWithinRange(num, range) {
    let maxNum = num + range
    let minNum = num - range
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
  }

  numberChecker(num) {
    if (num < this.lowestNumber) num = this.lowestNumber
    if (num > this.highestNumber) num = this.highestNumber
    return num
  }

  getRules() {
    return 'Write a program to play a number guessing game. The USER mentally selects a number between 0 and 99 and the computer ties to guess it. The computer outputs its guess, and the User response with "COLD" if the guess is more than 40 from the target number, "COOL" if the guess is within 20-39 of the target number, “WARM” if the guess is within 10-19 of the target number, “HOT” if the guess is within 1-9 of the target number or “correct”. The computer should keep count of the number of guesses. The computer should complain if the USER has lied.'
  }
}
</script>

<style>
</style>
