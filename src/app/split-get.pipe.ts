import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitGet'
})
export class SplitGetPipe implements PipeTransform {
  transform(input, separator){
    return input.split(separator)[0];
  }
}

