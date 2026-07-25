import { Directive, HostListener, signal } from '@angular/core';

@Directive({ selector: '[appHover]', standalone: true })
export class HoverDirective {
  readonly isHovered = signal(false);

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHovered.set(true);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHovered.set(false);
  }
}
