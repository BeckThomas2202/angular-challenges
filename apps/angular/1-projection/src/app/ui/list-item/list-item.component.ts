import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <button (click)="deleteButtonClicked.emit()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  name = input.required<string>();

  deleteButtonClicked = output();
}
