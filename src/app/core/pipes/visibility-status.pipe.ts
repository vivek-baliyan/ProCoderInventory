import { Pipe, PipeTransform } from '@angular/core';
import { VisibilityStatuses } from '../enums/visibility-status.enum';

@Pipe({
  name: 'visibilityStatus',
})
export class VisibilityStatusPipe implements PipeTransform {
  transform(value: string): string {
    const entries = Object.entries(VisibilityStatuses);

    const entry = entries.find(([_, val]) => val === value);

    return entry ? entry[0] : 'Unknown';
  }
}
