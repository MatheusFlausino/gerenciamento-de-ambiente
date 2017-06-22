import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitGet'
})
export class SplitGetPipe implements PipeTransform {
  transform(input: string, separator: string): any {
    return input.split(separator)[0];
  }
}

