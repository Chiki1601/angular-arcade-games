import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
    HostListener
} from '@angular/core';

interface Pipe {
    x: number;
    topHeight: number;
    bottomY: number;
    passed: boolean;
}

@Component({
    selector: 'app-flappy-bird',
    standalone: true,
    templateUrl: './flappy-bird.html',
    styleUrl: './flappy-bird.scss'
})
export class FlappyBirdComponent implements AfterViewInit {

    @ViewChild('gameCanvas', { static: true })
    canvas!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;

    readonly width = 900;
    readonly height = 600;

    readonly gravity = 0.5;
    readonly jumpForce = -9;

    birdX = 180;
    birdY = 250;
    birdRadius = 18;

    velocity = 0;

    score = 0;

    gameOver = false;

    private animationId = 0;

    pipes: Pipe[] = [];

    ngAfterViewInit(): void {

        const context = this.canvas.nativeElement.getContext('2d');

        if (!context) {
            return;
        }

        this.ctx = context;

        this.resetGame();

    }

    resetGame(): void {

        cancelAnimationFrame(this.animationId);

        this.score = 0;

        this.gameOver = false;

        this.birdY = 250;

        this.velocity = 0;

        this.pipes = [];

        this.createPipe();

        this.gameLoop();

    }

    jump(): void {

        if (this.gameOver) {

            this.resetGame();

            return;

        }

        this.velocity = this.jumpForce;

    }

    @HostListener('window:keydown', ['$event'])
    handleKey(event: KeyboardEvent): void {

        if (
            event.code === 'Space' ||
            event.key === 'ArrowUp'
        ) {

            event.preventDefault();

            this.jump();

        }

    }

    updateBird(): void {

        this.velocity += this.gravity;

        this.birdY += this.velocity;

        if (this.birdY < this.birdRadius) {

            this.birdY = this.birdRadius;

            this.velocity = 0;

        }

        if (this.birdY > this.height - this.birdRadius) {

            this.gameOver = true;

        }

    }

    createPipe(): void {

        const gap = 170;

        const topHeight =
            Math.floor(Math.random() * 250) + 50;

        this.pipes.push({

            x: this.width,

            topHeight,

            bottomY: topHeight + gap,

            passed: false

        });

    }

    drawBackground(): void {

        this.ctx.fillStyle = '#87CEEB';

        this.ctx.fillRect(

            0,

            0,

            this.width,

            this.height

        );

        this.ctx.fillStyle = '#7ec850';

        this.ctx.fillRect(

            0,

            this.height - 40,

            this.width,

            40

        );

    }

    drawBird(): void {

        this.ctx.beginPath();

        this.ctx.arc(

            this.birdX,

            this.birdY,

            this.birdRadius,

            0,

            Math.PI * 2

        );

        this.ctx.fillStyle = '#FFD54F';

        this.ctx.fill();

        this.ctx.closePath();

    }

    drawScore(): void {

        this.ctx.fillStyle = '#ffffff';

        this.ctx.font = 'bold 36px Arial';

        this.ctx.fillText(

            `Score : ${this.score}`,

            30,

            50

        );

    }
    updatePipes(): void {

        for (const pipe of this.pipes) {

            pipe.x -= 3;

            if (!pipe.passed && pipe.x + 70 < this.birdX) {

                pipe.passed = true;

                this.score++;

            }

        }

        if (this.pipes.length) {

            const lastPipe = this.pipes[this.pipes.length - 1];

            if (lastPipe.x < this.width - 320) {

                this.createPipe();

            }

        }

        this.pipes = this.pipes.filter(pipe => pipe.x > -80);

    }

    drawPipes(): void {

        this.ctx.fillStyle = '#4CAF50';

        for (const pipe of this.pipes) {

            // Top Pipe

            this.ctx.fillRect(

                pipe.x,

                0,

                70,

                pipe.topHeight

            );

            // Bottom Pipe

            this.ctx.fillRect(

                pipe.x,

                pipe.bottomY,

                70,

                this.height - pipe.bottomY

            );

        }

    }

    checkCollision(): void {

        for (const pipe of this.pipes) {

            const birdLeft = this.birdX - this.birdRadius;

            const birdRight = this.birdX + this.birdRadius;

            const birdTop = this.birdY - this.birdRadius;

            const birdBottom = this.birdY + this.birdRadius;

            const pipeLeft = pipe.x;

            const pipeRight = pipe.x + 70;

            const hitPipe =

                birdRight > pipeLeft &&

                birdLeft < pipeRight;

            if (hitPipe) {

                if (

                    birdTop < pipe.topHeight ||

                    birdBottom > pipe.bottomY

                ) {

                    this.gameOver = true;

                }

            }

        }

    }

    drawGameOver(): void {

        if (!this.gameOver) {

            return;

        }

        this.ctx.fillStyle = 'rgba(0,0,0,.55)';

        this.ctx.fillRect(

            0,

            0,

            this.width,

            this.height

        );

        this.ctx.fillStyle = '#ffffff';

        this.ctx.font = 'bold 56px Arial';

        this.ctx.fillText(

            'GAME OVER',

            this.width / 2 - 170,

            this.height / 2 - 20

        );

        this.ctx.font = '26px Arial';

        this.ctx.fillText(

            'Press SPACE to Restart',

            this.width / 2 - 150,

            this.height / 2 + 40

        );

    }

    gameLoop(): void {

        this.drawBackground();

        this.updateBird();

        this.updatePipes();

        this.checkCollision();

        this.drawPipes();

        this.drawBird();

        this.drawScore();

        this.drawGameOver();

        if (!this.gameOver) {

            this.animationId = requestAnimationFrame(() => {

                this.gameLoop();

            });

        }

    }

}