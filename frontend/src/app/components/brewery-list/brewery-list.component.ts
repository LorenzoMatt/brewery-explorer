import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brewery } from 'src/app/models/brewery.model';

@Component({
    selector: 'app-brewery-list',
    templateUrl: './brewery-list.component.html',
    styleUrls: ['./brewery-list.component.css'],
})
export class BreweryListComponent {
    @Input() breweries: Brewery[] = [];
    @Input() favoriteIdsSet: Set<string> = new Set<string>();
    @Output() brewerySelected = new EventEmitter<string>();
    @Output() addFavorite = new EventEmitter<string>();
    @Output() removeFavorite = new EventEmitter<string>();

    selectBrewery(brewery: Brewery) {
        this.brewerySelected.emit(brewery.id);
    }

    onAddFavorite(breweryId: string) {
        debugger;
        if (this.isFavorite(breweryId)) {
            this.removeFavorite.emit(breweryId);
        } else {
            this.addFavorite.emit(breweryId);
        }
    }

    isFavorite(breweryId: string): boolean {
        return this.favoriteIdsSet.has(breweryId);
    }
}
