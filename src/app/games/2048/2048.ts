import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-2048',
    standalone: true,
    templateUrl: './2048.html',
    styleUrl: './2048.scss'
})
export class TwentyFortyEightComponent {

    readonly size = 4;

    score = 0;

    gameOver = false;

    hasWon = false;

    board: number[][] = [];

    constructor() {
        this.newGame();
    }

    newGame(): void {

        this.score = 0;

        this.gameOver = false;

        this.hasWon = false;

        this.board = [];

        for (let row = 0; row < this.size; row++) {

            this.board[row] = [];

            for (let col = 0; col < this.size; col++) {

                this.board[row][col] = 0;

            }

        }

        this.addRandomTile();

        this.addRandomTile();

    }

    addRandomTile(): void {

        const emptyCells: { row: number; col: number }[] = [];

        for (let row = 0; row < this.size; row++) {

            for (let col = 0; col < this.size; col++) {

                if (this.board[row][col] === 0) {

                    emptyCells.push({ row, col });

                }

            }

        }

        if (!emptyCells.length) {
            return;
        }

        const randomCell =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];

        this.board[randomCell.row][randomCell.col] =
            Math.random() < 0.9 ? 2 : 4;

    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboard(event: KeyboardEvent): void {

        if (this.gameOver) {
            return;
        }

        let moved = false;

        switch (event.key) {

            case 'ArrowLeft':

                moved = this.moveLeft();

                break;

            case 'ArrowRight':

                moved = this.moveRight();

                break;

            case 'ArrowUp':

                moved = this.moveUp();

                break;

            case 'ArrowDown':

                moved = this.moveDown();

                break;

        }

        if (moved) {

            this.addRandomTile();

            this.checkWin();

            this.checkGameOver();

        }

    }

    private compress(row: number[]): number[] {

        return row.filter(value => value !== 0);

    }

    private merge(row: number[]): number[] {

        for (let i = 0; i < row.length - 1; i++) {

            if (row[i] === row[i + 1]) {

                row[i] *= 2;

                this.score += row[i];

                row[i + 1] = 0;

            }

        }

        return row;

    }

    private fill(row: number[]): number[] {

        const result = row.filter(value => value !== 0);

        while (result.length < this.size) {

            result.push(0);

        }

        return result;

    }

    private reverse(row: number[]): number[] {

        return [...row].reverse();

    }
    moveLeft(): boolean {

        let moved = false;

        for (let row = 0; row < this.size; row++) {

            const original = [...this.board[row]];

            let current = this.compress(this.board[row]);

            current = this.merge(current);

            current = this.compress(current);

            current = this.fill(current);

            this.board[row] = current;

            if (original.toString() !== current.toString()) {

                moved = true;

            }

        }

        return moved;

    }

    moveRight(): boolean {

        let moved = false;

        for (let row = 0; row < this.size; row++) {

            const original = [...this.board[row]];

            let current = this.reverse(this.board[row]);

            current = this.compress(current);

            current = this.merge(current);

            current = this.compress(current);

            current = this.fill(current);

            current = this.reverse(current);

            this.board[row] = current;

            if (original.toString() !== current.toString()) {

                moved = true;

            }

        }

        return moved;

    }

    moveUp(): boolean {

        let moved = false;

        for (let col = 0; col < this.size; col++) {

            const original: number[] = [];

            for (let row = 0; row < this.size; row++) {

                original.push(this.board[row][col]);

            }

            let current = [...original];

            current = this.compress(current);

            current = this.merge(current);

            current = this.compress(current);

            current = this.fill(current);

            for (let row = 0; row < this.size; row++) {

                this.board[row][col] = current[row];

            }

            if (original.toString() !== current.toString()) {

                moved = true;

            }

        }

        return moved;

    }

    moveDown(): boolean {

        let moved = false;

        for (let col = 0; col < this.size; col++) {

            const original: number[] = [];

            for (let row = 0; row < this.size; row++) {

                original.push(this.board[row][col]);

            }

            let current = this.reverse(original);

            current = this.compress(current);

            current = this.merge(current);

            current = this.compress(current);

            current = this.fill(current);

            current = this.reverse(current);

            for (let row = 0; row < this.size; row++) {

                this.board[row][col] = current[row];

            }

            if (original.toString() !== current.toString()) {

                moved = true;

            }

        }

        return moved;

    }

    checkWin(): void {

        for (const row of this.board) {

            if (row.includes(2048)) {

                this.hasWon = true;

                return;

            }

        }

    }

    checkGameOver(): void {

        for (let row = 0; row < this.size; row++) {

            for (let col = 0; col < this.size; col++) {

                if (this.board[row][col] === 0) {

                    return;

                }

            }

        }

        for (let row = 0; row < this.size; row++) {

            for (let col = 0; col < this.size - 1; col++) {

                if (this.board[row][col] === this.board[row][col + 1]) {

                    return;

                }

            }

        }

        for (let col = 0; col < this.size; col++) {

            for (let row = 0; row < this.size - 1; row++) {

                if (this.board[row][col] === this.board[row + 1][col]) {

                    return;

                }

            }

        }

        this.gameOver = true;

    }

    getTileColor(value: number): string {

        switch (value) {

            case 0: return '#cdc1b4';
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
            default: return '#3c3a32';

        }

    }

    getTextColor(value: number): string {

        return value <= 4
            ? '#776e65'
            : '#ffffff';

    }

}