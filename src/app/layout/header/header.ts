import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  readonly darkMode = signal(false);

  toggleTheme(): void {
    this.darkMode.update(value => !value);

    document.body.classList.toggle('dark-theme', this.darkMode());
  }
}