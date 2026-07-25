import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { HeaderComponent } from '../header/header';
import { SidenavComponent } from '../sidenav/sidenav';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidenavComponent, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class ShellComponent {}
