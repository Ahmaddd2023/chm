import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointsToUsd',
})
export class BalacePointsToUsdPipe implements PipeTransform {
  transform(value: number | string |null): number {
    if (!value) {
      return 0;
    }
    let valueNumber = Number(value);

    return valueNumber * 0.1;

  }
}
