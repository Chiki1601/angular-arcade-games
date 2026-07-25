import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  standalone: true,
  templateUrl: './dice.html',
  styleUrl: './dice.scss'
})
export class DiceComponent {

  readonly diceFaces = [
    '⚀',
    '⚁',
    '⚂',
    '⚃',
    '⚄',
    '⚅'
  ];

  player1 = 1;

  player2 = 1;

  total = 2;

  winner = '';

  isRolling = false;

  history: {
    player1: number;
    player2: number;
    total: number;
    winner: string;
  }[] = [];

  rollDice(): void {

    if (this.isRolling) {
      return;
    }

    this.isRolling = true;

    let count = 0;

    const animation = setInterval(() => {

      this.player1 = this.randomDice();

      this.player2 = this.randomDice();

      count++;

      if (count > 12) {

        clearInterval(animation);

        this.player1 = this.randomDice();

        this.player2 = this.randomDice();

        this.total = this.player1 + this.player2;

        this.calculateWinner();

        this.history.unshift({

          player1: this.player1,

          player2: this.player2,

          total: this.total,

          winner: this.winner

        });

        if (this.history.length > 10) {

          this.history.pop();

        }

        this.isRolling = false;

      }

    }, 70);

  }

  randomDice(): number {

    return Math.floor(Math.random() * 6) + 1;

  }

  calculateWinner(): void {

    if (this.player1 > this.player2) {

      this.winner = '🎉 Player 1 Wins';

    } else if (this.player2 > this.player1) {

      this.winner = '🏆 Player 2 Wins';

    } else {

      this.winner = '🤝 Draw';

    }

  }

  reset(): void {

    this.player1 = 1;

    this.player2 = 1;

    this.total = 2;

    this.winner = '';

    this.history = [];

  }

  get playerOneFace(): string {

    return this.diceFaces[this.player1 - 1];

  }

  get playerTwoFace(): string {

    return this.diceFaces[this.player2 - 1];

  }

}