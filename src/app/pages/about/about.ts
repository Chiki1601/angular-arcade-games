import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  readonly technologies = [
    'Angular 22',
    'TypeScript',
    'Angular Material',
    'SCSS',
    'HTML5',
    'Angular Signals',
    'RxJS',
    'Standalone Components'
  ];

  readonly games = [
    'Snake',
    '2048',
    'Tetris',
    'Pong',
    'Sudoku',
    'Flappy Bird',
    'Bubble Shooter',
    'Rock Paper Scissors',
    'Dice Roller',
    'Tic Tac Toe'
  ];

}