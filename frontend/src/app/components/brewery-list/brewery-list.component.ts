import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brewery } from 'src/app/models/brewery.model';

@Component({
    selector: 'app-brewery-list',
    templateUrl: './brewery-list.component.html',
    styleUrls: ['./brewery-list.component.css'],
})
export class BreweryListComponent {
    @Input() breweries: Brewery[] = [];
    @Output() brewerySelected = new EventEmitter<string>();

    selectBrewery(brewery: Brewery) {
        this.brewerySelected.emit(brewery.id);
    }
}
