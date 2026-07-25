import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Game {
  title: string;
  icon: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class Games {

  readonly games: Game[] = [
    {
      title: 'Snake',
      icon: '🐍',
      route: '/games/snake',
      description: 'Classic snake game'
    },
    {
      title: '2048',
      icon: '🟨',
      route: '/games/2048',
      description: 'Merge tiles to reach 2048'
    },
    {
      title: 'Tetris',
      icon: '🧱',
      route: '/games/tetris',
      description: 'Arrange falling blocks'
    },
    {
      title: 'Pong',
      icon: '🏓',
      route: '/games/pong',
      description: 'Classic paddle game'
    },
    {
      title: 'Sudoku',
      icon: '🧩',
      route: '/games/sudoku',
      description: 'Number puzzle'
    },
    {
      title: 'Flappy Bird',
      icon: '🐦',
      route: '/games/flappy-bird',
      description: 'Avoid obstacles'
    },
    {
      title: 'Dice Roller',
      icon: '🎲',
      route: '/games/dice',
      description: 'Roll a random dice'
    },
    {
      title: 'Rock Paper Scissors',
      icon: '✊',
      route: '/games/rock-paper-scissors',
      description: 'Play against the computer'
    },
    {
      title: 'Color Match',
      icon: '🎨',
      route: '/games/color-match',
      description: 'Match the text color, not the word'
    },
    {
      title: 'Tic Tac Toe',
      icon: '❌',
      route: '/games/tic-tac-toe',
      description: 'Classic X and O game'
    }
  ];

}