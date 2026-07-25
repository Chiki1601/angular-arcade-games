import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-color-match',
  standalone: true,
  templateUrl: './color-match.html',
  styleUrl: './color-match.scss'
})
export class ColorMatchComponent  implements OnDestroy {

  colors: string[] = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange'
  ];

  displayWord = '';

  displayColor = '';

  score = 0;

  streak = 0;

  highScore = 0;

  accuracy = 0;

  timeLeft = 60;

  totalAttempts = 0;

  correctAnswers = 0;

  gameStarted = false;

  gameOver = false;

  timer: any;

  constructor() {
    this.generateQuestion();
  }

  startGame(): void {

    this.score = 0;

    this.streak = 0;

    this.timeLeft = 60;

    this.totalAttempts = 0;

    this.correctAnswers = 0;

    this.gameStarted = true;

    this.gameOver = false;

    this.generateQuestion();

    clearInterval(this.timer);

    this.timer = setInterval(() => {

      this.timeLeft--;

      if (this.timeLeft <= 0) {

        this.finishGame();

      }

    }, 1000);

  }

  selectColor(selectedColor: string): void {

    if (this.gameOver) {

      return;

    }

    this.totalAttempts++;

    if (selectedColor === this.displayColor) {

      this.score += 10;

      this.streak++;

      this.correctAnswers++;

      // Bonus every 5 streak
      if (this.streak > 0 && this.streak % 5 === 0) {

        this.score += 20;

      }

    } else {

      this.streak = 0;

      this.score = Math.max(0, this.score - 5);

    }

    this.accuracy = Math.round(
      (this.correctAnswers / this.totalAttempts) * 100
    );

    this.generateQuestion();

  }

  generateQuestion(): void {

    const randomWord =
      Math.floor(Math.random() * this.colors.length);

    let randomColor =
      Math.floor(Math.random() * this.colors.length);

    while (randomColor === randomWord) {

      randomColor =
        Math.floor(Math.random() * this.colors.length);

    }

    this.displayWord =
      this.colors[randomWord].toUpperCase();

    this.displayColor =
      this.colors[randomColor];

  }

  finishGame(): void {

    clearInterval(this.timer);

    this.gameOver = true;

    this.gameStarted = false;

    if (this.score > this.highScore) {

      this.highScore = this.score;

    }

  }

  restartGame(): void {

    this.startGame();

  }

  ngOnDestroy(): void {

    clearInterval(this.timer);

  }

}