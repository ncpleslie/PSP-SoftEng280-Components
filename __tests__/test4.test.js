import { mount } from '@vue/test-utils'
import GameComponent from '../src/components/GameComponent'

describe('App.vue', () => {
  it('Check newly added component', () => {
    const wrapper = mount(GameComponent, {
      propsData: {
        gameNum: 3
      }
    })
    let buttons = wrapper.find('button.start').trigger('click')
    console.log(wrapper.vm.currentStatement)
  })
})

class Game {
  constructor(newGuess, gameNumber) {
    this.randomNum = Math.floor(Math.random() * 99)
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

  resetRandNum() {
    this.randomNum = Math.floor(Math.random() * 99)
  }
}

class GameOne extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value)
    if (this.guess) {
      this.count++
      if (this.guess > 99) this.guess = 99
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
    this.guess = parseInt(event.target.value)
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
  calcGuess(event) {
    this.count++
    if (this.guess == null) {
      this.guess = this.randomNum
      return this.getRandomNum().toString()
    }
  }

  tryHigher() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.count++
    this.lowestNumber = this.guess
    let returningNumber = Math.floor(
      Math.random() * (this.highestNumber - this.lowestNumber + 1) +
        this.lowestNumber
    )
    this.guess = returningNumber
    return returningNumber.toString()
  }

  tryLower() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.count++
    this.highestNumber = this.guess
    let returningNumber = Math.floor(
      Math.random() * (this.highestNumber - this.lowestNumber + 1) +
        this.lowestNumber
    )
    this.guess = returningNumber
    return returningNumber.toString()
  }

  getRules() {
    return 'String'
  }
}
