import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      class="bg-green-100"
      (addButtonClicked)="addStudent()">
      <img src="assets/img/student.webp" alt="student img" width="200px" />
      <ng-template [cardRow]="students" let-student>
        <app-list-item
          (deleteButtonClicked)="deleteStudent(student.id)"
          [name]="student.firstName" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [``],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private readonly http: FakeHttpService,
    private readonly store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }

  public addStudent() {
    this.store.addOne(randStudent());
  }

  public deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
