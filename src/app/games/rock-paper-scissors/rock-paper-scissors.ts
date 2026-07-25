import { Component } from '@angular/core';

type Choice = 'Rock' | 'Paper' | 'Scissors';

interface GameChoice {
  name: Choice;
  emoji: string;
}

@Component({
  selector: 'app-rock-paper-scissors',
  standalone: true,
  templateUrl: './rock-paper-scissors.html',
  styleUrl: './rock-paper-scissors.scss'
})
export class RockPaperScissorsComponent {

  readonly choices: GameChoice[] = [
    {
      name: 'Rock',
      emoji: '🪨'
    },
    {
      name: 'Paper',
      emoji: '📄'
    },
    {
      name: 'Scissors',
      emoji: '✂️'
    }
  ];

  playerChoice?: GameChoice;

  computerChoice?: GameChoice;

  result = 'Choose your move!';

  playerScore = 0;

  computerScore = 0;

  draws = 0;

  play(choice: GameChoice): void {

    this.playerChoice = choice;

    this.computerChoice =
      this.choices[Math.floor(Math.random() * this.choices.length)];

    this.calculateWinner();

  }

  private calculateWinner(): void {

    if (!this.playerChoice || !this.computerChoice) {
      return;
    }

    const player = this.playerChoice.name;
    const computer = this.computerChoice.name;

    if (player === computer) {

      this.result = '🤝 Draw';

      this.draws++;

      return;

    }

    if (

      (player === 'Rock' && computer === 'Scissors') ||

      (player === 'Paper' && computer === 'Rock') ||

      (player === 'Scissors' && computer === 'Paper')

    ) {

      this.result = '🎉 You Win!';

      this.playerScore++;

    } else {

      this.result = '💀 Computer Wins';

      this.computerScore++;

    }

  }

  reset(): void {

    this.playerChoice = undefined;

    this.computerChoice = undefined;

    this.result = 'Choose your move!';

    this.playerScore = 0;

    this.computerScore = 0;

    this.draws = 0;

  }

}