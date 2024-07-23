import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
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
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loadFavorites();
    }

    loadFavorites() {
        this.breweryService.getUserFavorites().subscribe(
            (data) => {
                this.breweries = data;
                this.favoriteIdsSet = new Set(
                    data.map((brewery) => brewery.id)
                );
            },
            (error) => {
                this.notificationService.showError('Error loading favorites');
                console.error(error);
            }
        );
    }

    isFavorite(breweryId: string): boolean {
        return this.favoriteIdsSet.has(breweryId);
    }

    onAddFavorite(breweryId: string) {
        if (!this.isFavorite(breweryId)) {
            this.breweryService.addFavorite(breweryId).subscribe(
                () => {
                    this.favoriteIdsSet.add(breweryId);
                },
                (error) => {
                    this.notificationService.showError(
                        'Error adding to favorites'
                    );
                    console.error(error);
                }
            );
        }
    }

    onRemoveFavorite(breweryId: string) {
        if (this.isFavorite(breweryId)) {
            this.breweryService.removeFavorite(breweryId).subscribe(
                () => {
                    this.favoriteIdsSet.delete(breweryId);
                },
                (error) => {
                    this.notificationService.showError(
                        'Error removing from favorites'
                    );
                    console.error(error);
                }
            );
        }
    }

    onBrewerySelected(id: string) {
        this.router.navigate(['/brewery', id]);
    }
}
