import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell').then((m) => m.ShellComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent) },
      { path: 'games',loadComponent: () =>import('./pages/games/games').then((m) => m.Games)},
      { path: 'leaderboard', loadComponent: () => import('./pages/leaderboard/leaderboard').then((m) => m.LeaderboardComponent) },
      { path: 'achievements', loadComponent: () => import('./pages/achievements/achievements').then((m) => m.AchievementsComponent) },
      { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
      { path: 'games/snake', loadComponent: () => import('./games/snake/snake').then((m) => m.SnakeComponent) },
      { path: 'games/pong', loadComponent: () => import('./games/pong/pong').then((m) => m.PongComponent) },
      { path: 'games/tetris', loadComponent: () => import('./games/tetris/tetris').then((m) => m.TetrisComponent) },
      { path: 'games/flappy-bird', loadComponent: () => import('./games/flappy-bird/flappy-bird').then((m) => m.FlappyBirdComponent) },
      { path: 'games/sudoku', loadComponent: () => import('./games/sudoku/sudoku').then((m) => m.SudokuComponent) },
      { path: 'games/tic-tac-toe', loadComponent: () => import('./games/tic-tac-toe/tic-tac-toe').then((m) => m.TicTacToeComponent) },
      { path: 'games/2048', loadComponent: () => import('./games/2048/2048').then((m) => m.TwentyFortyEightComponent) },
      { path: 'games/dice', loadComponent: () => import('./games/dice/dice').then((m) => m.DiceComponent) },
      { path: 'games/rock-paper-scissors', loadComponent: () => import('./games/rock-paper-scissors/rock-paper-scissors').then((m) => m.RockPaperScissorsComponent) },
      { path: 'games/color-match',loadComponent: () => import('./games/color-match/color-match').then(m => m.ColorMatchComponent )
}
    ]
  },
  { path: '**', redirectTo: 'home' }
];
