import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
