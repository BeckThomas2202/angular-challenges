import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      class="bg-red-100"
      (addButtonClicked)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template [cardRow]="teachers" let-teacher>
        <app-list-item
          (deleteButtonClicked)="deleteTeacher(teacher.id)"
          [name]="teacher.firstName" />
      </ng-template>
    </app-card>
  `,
  styles: [``],
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private readonly http: FakeHttpService,
    private readonly store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  public addTeacher() {
    this.store.addOne(randTeacher());
  }

  public deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
