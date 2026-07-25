import {
  AfterViewInit,
  Component,
  HostListener
} from '@angular/core';

type Cell = number;

@Component({
  selector: 'app-tetris',
  standalone: true,
  templateUrl: './tetris.html',
  styleUrl: './tetris.scss'
})
export class TetrisComponent implements AfterViewInit {

  readonly rows = 20;
  readonly cols = 10;

  board: Cell[][] = [];

  currentPiece: number[][] = [];

  currentX = 3;

  currentY = 0;

  score = 0;

  level = 1;

  lines = 0;

  gameOver = false;

  timer: any;

  readonly colors = [
    '',
    '#00BCD4',
    '#2196F3',
    '#FF9800',
    '#FFEB3B',
    '#4CAF50',
    '#9C27B0',
    '#F44336'
  ];

  readonly pieces = [

    [
      [1,1,1,1]
    ],

    [
      [2,0,0],
      [2,2,2]
    ],

    [
      [0,0,3],
      [3,3,3]
    ],

    [
      [4,4],
      [4,4]
    ],

    [
      [0,5,5],
      [5,5,0]
    ],

    [
      [0,6,0],
      [6,6,6]
    ],

    [
      [7,7,0],
      [0,7,7]
    ]

  ];

  ngAfterViewInit(): void {

    this.startGame();

  }

  startGame(): void {

    this.board = Array.from(
      { length: this.rows },
      () => Array(this.cols).fill(0)
    );

    this.score = 0;

    this.level = 1;

    this.lines = 0;

    this.gameOver = false;

    this.spawnPiece();

    clearInterval(this.timer);

    this.timer = setInterval(() => {

      this.moveDown();

    }, 600);

  }

  spawnPiece(): void {

    const random =
      Math.floor(Math.random() * this.pieces.length);

    this.currentPiece =
      this.pieces[random].map(r => [...r]);

    this.currentX = 3;

    this.currentY = 0;

  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent): void {

    if (this.gameOver) {
      return;
    }

    switch (event.key) {

      case 'ArrowLeft':
        this.moveLeft();
        break;

      case 'ArrowRight':
        this.moveRight();
        break;

      case 'ArrowDown':
        this.moveDown();
        break;

      case 'ArrowUp':
        this.rotate();
        break;

      case ' ':
        event.preventDefault();
        this.drop();
        break;

    }

  }

  moveLeft(): void {

    this.currentX--;

  }

  moveRight(): void {

    this.currentX++;

  }

  moveDown(): void {

    this.currentY++;

  }

  rotate(): void {

    const rotated = this.currentPiece[0].map((_, i) =>
      this.currentPiece.map(row => row[i]).reverse()
    );

    this.currentPiece = rotated;

  }

  drop(): void {

    while (this.currentY < this.rows) {

      this.currentY++;

    }

  }

}