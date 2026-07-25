import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-snake',
  standalone: true,
  templateUrl: './snake.html',
  styleUrl: './snake.scss'
})
export class SnakeComponent implements AfterViewInit {

  @ViewChild('gameCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  readonly canvasSize = 600;
  readonly cellSize = 20;

  score = 0;

  isGameOver = false;

  private gameInterval: any;

  private direction: Point = {
    x: 1,
    y: 0
  };

  private snake: Point[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  private food: Point = {
    x: 15,
    y: 15
  };

  ngAfterViewInit(): void {

    const context = this.canvas.nativeElement.getContext('2d');

    if (!context) {
      return;
    }

    this.ctx = context;

    this.startGame();

  }

  startGame(): void {

    clearInterval(this.gameInterval);

    this.gameInterval = setInterval(() => {

      this.update();

      this.draw();

    }, 120);

  }

  restart(): void {

    this.score = 0;

    this.isGameOver = false;

    this.direction = {
      x: 1,
      y: 0
    };

    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];

    this.generateFood();

    this.startGame();

  }

  update(): void {

    if (this.isGameOver) {
      return;
    }

    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // Wall Collision

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= this.canvasSize / this.cellSize ||
      head.y >= this.canvasSize / this.cellSize
    ) {

      this.gameOver();

      return;

    }

    // Self Collision

    for (const part of this.snake) {

      if (part.x === head.x && part.y === head.y) {

        this.gameOver();

        return;

      }

    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {

      this.score++;

      this.generateFood();

    } else {

      this.snake.pop();

    }

  }

  draw(): void {

    this.ctx.fillStyle = '#1b1b1b';

    this.ctx.fillRect(
      0,
      0,
      this.canvasSize,
      this.canvasSize
    );

    // Food

    this.ctx.fillStyle = '#ff4d4d';

    this.ctx.beginPath();

    this.ctx.arc(
      this.food.x * this.cellSize + this.cellSize / 2,
      this.food.y * this.cellSize + this.cellSize / 2,
      this.cellSize / 2.5,
      0,
      Math.PI * 2
    );

    this.ctx.fill();

    // Snake

    this.snake.forEach((segment, index) => {

      this.ctx.fillStyle = index === 0
        ? '#4CAF50'
        : '#81C784';

      this.ctx.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize - 2,
        this.cellSize - 2
      );

    });

  }

  generateFood(): void {

    this.food = {

      x: Math.floor(Math.random() * (this.canvasSize / this.cellSize)),

      y: Math.floor(Math.random() * (this.canvasSize / this.cellSize))

    };

  }

  gameOver(): void {

    this.isGameOver = true;

    clearInterval(this.gameInterval);

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {

    switch (event.key) {

      case 'ArrowUp':

        if (this.direction.y !== 1) {

          this.direction = { x: 0, y: -1 };

        }

        break;

      case 'ArrowDown':

        if (this.direction.y !== -1) {

          this.direction = { x: 0, y: 1 };

        }

        break;

      case 'ArrowLeft':

        if (this.direction.x !== 1) {

          this.direction = { x: -1, y: 0 };

        }

        break;

      case 'ArrowRight':

        if (this.direction.x !== -1) {

          this.direction = { x: 1, y: 0 };

        }

        break;

    }

  }

}