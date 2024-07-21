import { Component, Input } from '@angular/core';
import { Brewery } from '../../models/brewery.model';

@Component({
    selector: 'app-brewery-list',
    templateUrl: './brewery-list.component.html',
    styleUrls: ['./brewery-list.component.css'],
})
export class BreweryListComponent {
    @Input() breweries: Brewery[] = [];
}
