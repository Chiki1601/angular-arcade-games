import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.scss'
})
export class TicTacToeComponent {

  board: string[] = Array(9).fill('');

  currentPlayer = 'X';

  winner = '';

  gameOver = false;

  playerXScore = 0;

  playerOScore = 0;

  draws = 0;

  play(index: number): void {

    if (
      this.board[index] ||
      this.gameOver
    ) {
      return;
    }

    this.board[index] = this.currentPlayer;

    this.checkWinner();

    if (!this.gameOver) {

      this.currentPlayer =
        this.currentPlayer === 'X'
          ? 'O'
          : 'X';

    }

  }

  private checkWinner(): void {

    const wins = [

      [0,1,2],
      [3,4,5],
      [6,7,8],

      [0,3,6],
      [1,4,7],
      [2,5,8],

      [0,4,8],
      [2,4,6]

    ];

    for (const pattern of wins) {

      const [a,b,c] = pattern;

      if (

        this.board[a] &&

        this.board[a] === this.board[b] &&

        this.board[a] === this.board[c]

      ) {

        this.winner =
          `🎉 Player ${this.board[a]} Wins`;

        this.gameOver = true;

        if (this.board[a] === 'X') {

          this.playerXScore++;

        } else {

          this.playerOScore++;

        }

        return;

      }

    }

    if (!this.board.includes('')) {

      this.winner = '🤝 Draw';

      this.draws++;

      this.gameOver = true;

    }

  }

  resetGame(): void {

    this.board = Array(9).fill('');

    this.currentPlayer = 'X';

    this.winner = '';

    this.gameOver = false;

  }

  resetScore(): void {

    this.resetGame();

    this.playerXScore = 0;

    this.playerOScore = 0;

    this.draws = 0;

  }

}   