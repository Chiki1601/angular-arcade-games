import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})
export class SidenavComponent {

  readonly menuItems: MenuItem[] = [
    {
      title: 'Home',
      icon: '🏠',
      route: '/home'
    },
    {
      title: 'Games',
      icon: '🎮',
      route: '/games'
    },
    {
      title: 'Leaderboard',
      icon: '🏆',
      route: '/leaderboard'
    },
    {
      title: 'Achievements',
      icon: '⭐',
      route: '/achievements'
    },
    {
      title: 'About',
      icon: 'ℹ️',
      route: '/about'
    }
  ];

}