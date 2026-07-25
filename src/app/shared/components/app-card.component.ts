import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: '<div class="card"><ng-content /></div>',
  styles: ['.card { border: 1px solid #d9d9d9; border-radius: 12px; padding: 1rem; }']
})
export class AppCardComponent {}
