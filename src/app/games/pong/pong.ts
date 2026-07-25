import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  speed: number;
}

@Component({
  selector: 'app-pong',
  standalone: true,
  templateUrl: './pong.html',
  styleUrl: './pong.scss'
})
export class PongComponent implements AfterViewInit {

  @ViewChild('gameCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  readonly width = 900;
  readonly height = 550;

  playerScore = 0;
  aiScore = 0;

  gameOver = false;

  private animationId = 0;

  player: Paddle = {
    x: 20,
    y: 220,
    width: 18,
    height: 120,
    speed: 8
  };

  ai: Paddle = {
    x: 862,
    y: 220,
    width: 18,
    height: 120,
    speed: 6
  };

  ball: Ball = {
    x: 450,
    y: 275,
    radius: 12,
    dx: 5,
    dy: 4,
    speed: 5
  };

  moveUp = false;
  moveDown = false;

  ngAfterViewInit(): void {

    const context =
      this.canvas.nativeElement.getContext('2d');

    if (!context) return;

    this.ctx = context;

    this.reset();

  }

  reset(): void {

    cancelAnimationFrame(this.animationId);

    this.playerScore = 0;
    this.aiScore = 0;

    this.gameOver = false;

    this.player.y = 220;
    this.ai.y = 220;

    this.resetBall();

    this.gameLoop();

  }

  resetBall(): void {

    this.ball.x = this.width / 2;

    this.ball.y = this.height / 2;

    this.ball.dx =
      Math.random() > .5
        ? this.ball.speed
        : -this.ball.speed;

    this.ball.dy =
      Math.random() > .5
        ? this.ball.speed
        : -this.ball.speed;

  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {

    if (event.key === 'ArrowUp') {

      this.moveUp = true;

    }

    if (event.key === 'ArrowDown') {

      this.moveDown = true;

    }

  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {

    if (event.key === 'ArrowUp') {

      this.moveUp = false;

    }

    if (event.key === 'ArrowDown') {

      this.moveDown = false;

    }

  }

  updatePlayer(): void {

    if (this.moveUp) {

      this.player.y -= this.player.speed;

    }

    if (this.moveDown) {

      this.player.y += this.player.speed;

    }

    if (this.player.y < 0) {

      this.player.y = 0;

    }

    if (
      this.player.y + this.player.height >
      this.height
    ) {

      this.player.y =
        this.height - this.player.height;

    }

  }

  updateAI(): void {

    const center =
      this.ai.y + this.ai.height / 2;

    if (center < this.ball.y - 10) {

      this.ai.y += this.ai.speed;

    }

    if (center > this.ball.y + 10) {

      this.ai.y -= this.ai.speed;

    }

    if (this.ai.y < 0) {

      this.ai.y = 0;

    }

    if (
      this.ai.y + this.ai.height >
      this.height
    ) {

      this.ai.y =
        this.height - this.ai.height;

    }

  }

  drawBackground(): void {

    this.ctx.fillStyle = "#111";

    this.ctx.fillRect(
      0,
      0,
      this.width,
      this.height
    );

    this.ctx.strokeStyle = "#444";

    this.ctx.setLineDash([12,12]);

    this.ctx.beginPath();

    this.ctx.moveTo(
      this.width / 2,
      0
    );

    this.ctx.lineTo(
      this.width / 2,
      this.height
    );

    this.ctx.stroke();

    this.ctx.setLineDash([]);

  }

  drawPaddles(): void {

    this.ctx.fillStyle = "#4CAF50";

    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );

    this.ctx.fillRect(
      this.ai.x,
      this.ai.y,
      this.ai.width,
      this.ai.height
    );

  }

  drawBall(): void {

    this.ctx.beginPath();

    this.ctx.arc(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      0,
      Math.PI * 2
    );

    this.ctx.fillStyle = "#fff";

    this.ctx.fill();

  }

  drawScore(): void {

    this.ctx.fillStyle = "#ffffff";

    this.ctx.font = "bold 34px Arial";

    this.ctx.fillText(
      `${this.playerScore}`,
      300,
      50
    );

    this.ctx.fillText(
      `${this.aiScore}`,
      570,
      50
    );

  }
    updateBall(): void {

    this.ball.x += this.ball.dx;

    this.ball.y += this.ball.dy;

    // Top & Bottom Wall Collision

    if (
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.height
    ) {

      this.ball.dy *= -1;

    }

    // Player Paddle Collision

    if (

      this.ball.x - this.ball.radius <=
      this.player.x + this.player.width &&

      this.ball.y >= this.player.y &&

      this.ball.y <= this.player.y + this.player.height

    ) {

      this.ball.dx = Math.abs(this.ball.dx);

    }

    // AI Paddle Collision

    if (

      this.ball.x + this.ball.radius >= this.ai.x &&

      this.ball.y >= this.ai.y &&

      this.ball.y <= this.ai.y + this.ai.height

    ) {

      this.ball.dx = -Math.abs(this.ball.dx);

    }

    // Player Missed

    if (this.ball.x < 0) {

      this.aiScore++;

      this.resetBall();

    }

    // AI Missed

    if (this.ball.x > this.width) {

      this.playerScore++;

      this.resetBall();

    }

    // Winning Score

    if (
      this.playerScore >= 10 ||
      this.aiScore >= 10
    ) {

      this.gameOver = true;

    }

  }

  drawWinner(): void {

    if (!this.gameOver) {

      return;

    }

    this.ctx.fillStyle = "rgba(0,0,0,.7)";

    this.ctx.fillRect(

      0,

      0,

      this.width,

      this.height

    );

    this.ctx.fillStyle = "#ffffff";

    this.ctx.font = "bold 46px Arial";

    const text =
      this.playerScore > this.aiScore
        ? "🎉 YOU WIN!"
        : "🤖 COMPUTER WINS!";

    this.ctx.fillText(

      text,

      this.width / 2 - 170,

      this.height / 2 - 20

    );

    this.ctx.font = "24px Arial";

    this.ctx.fillText(

      "Press R to Restart",

      this.width / 2 - 95,

      this.height / 2 + 35

    );

  }

  gameLoop(): void {

    this.drawBackground();

    this.updatePlayer();

    this.updateAI();

    this.updateBall();

    this.drawPaddles();

    this.drawBall();

    this.drawScore();

    this.drawWinner();

    if (!this.gameOver) {

      this.animationId =
        requestAnimationFrame(() => {

          this.gameLoop();

        });

    }

  }

  @HostListener('window:keydown.r')

  restartGame(): void {

    if (this.gameOver) {

      this.reset();

    }

  }

}