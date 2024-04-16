import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertPath'
})
export class ConvertPathPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\\/g, '/');
  }
}
