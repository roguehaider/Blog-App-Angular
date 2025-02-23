import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncateHtml',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 25): string {
    if (!value) return '';

    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    const text = tempElement.textContent || tempElement.innerText || '';

    if (text.length <= limit) return value;

    let truncated = text.substr(0, limit);
    if (truncated.lastIndexOf(' ') > 0) {
      truncated = truncated.substr(0, truncated.lastIndexOf(' '));
    }

    const truncatedHtml = value.replace(text, truncated + '...');
    return truncatedHtml;
  }
}
