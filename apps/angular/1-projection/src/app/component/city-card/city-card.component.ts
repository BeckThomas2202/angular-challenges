import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      (addButtonClicked)="addCity()"
      [list]="cities"
      class="bg-blue-100">
      <img src="assets/img/city.png" alt="city picture" width="200px" />
      <ng-template [cardRow]="cities" let-city>
        <app-list-item
          (deleteButtonClicked)="deleteCity(city.id)"
          [name]="city.name" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardRowDirective, ListItemComponent, CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private readonly store: CityStore,
    private readonly http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }

  public addCity() {
    this.store.addOne(randomCity());
  }

  public deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
