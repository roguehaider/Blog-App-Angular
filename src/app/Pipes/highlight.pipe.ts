import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, search: string): SafeHtml {
    if (!search || !value) {
      return value;
    }
    const pattern = search.replace(
      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      '\\$&'
    );
    const regex = new RegExp(pattern, 'gi');
    const result = value.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
