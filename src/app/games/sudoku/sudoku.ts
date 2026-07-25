import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sudoku',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.scss'
})
export class SudokuComponent {

  readonly initialBoard: number[][] = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],

    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],

    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ];

  readonly solution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],

    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],

    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];

  board:number[][]=[];

  message='';

  constructor(){

    this.reset();

  }

  reset(){

    this.board=this.initialBoard.map(row=>[...row]);

    this.message='';

  }

  isFixed(row:number,col:number){

    return this.initialBoard[row][col]!==0;

  }

  updateCell(row:number,col:number,event:Event){

    const input=event.target as HTMLInputElement;

    let value=Number(input.value);

    if(value<1||value>9){

      value=0;

    }

    this.board[row][col]=value;

  }

  check(){

    for(let r=0;r<9;r++){

      for(let c=0;c<9;c++){

        if(this.board[r][c]!==this.solution[r][c]){

          this.message='❌ Sudoku is not solved yet.';

          return;

        }

      }

    }

    this.message='🎉 Congratulations! Sudoku Solved.';

  }

}