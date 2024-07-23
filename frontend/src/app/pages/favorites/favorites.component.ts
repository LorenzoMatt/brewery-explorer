import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
    breweries: Brewery[] = [];
    favoriteIdsSet: Set<string> = new Set<string>();

    constructor(
        private breweryService: BreweryService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadFavorites();
    }

    loadFavorites() {
        this.breweryService.getUserFavorites().subscribe((data) => {
            this.breweries = data;
            this.favoriteIdsSet = new Set(data.map((b) => b.id));
        });
    }

    isFavorite(breweryId: string): boolean {
        return this.favoriteIdsSet.has(breweryId);
    }

    onAddFavorite(breweryId: string) {
        if (!this.isFavorite(breweryId)) {
            this.breweryService.addFavorite(breweryId).subscribe(() => {
                this.favoriteIdsSet.add(breweryId);
            });
        }
    }

    onRemoveFavorite(breweryId: string) {
        if (this.isFavorite(breweryId)) {
            this.breweryService.removeFavorite(breweryId).subscribe(() => {
                this.favoriteIdsSet.delete(breweryId);
            });
        }
    }

    onBrewerySelected(id: string) {
        this.router.navigate(['/brewery', id]);
    }
}
