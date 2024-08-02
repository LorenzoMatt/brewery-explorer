import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brewery } from 'src/app/models/brewery.model';
import { BreweryService } from 'src/app/services/brewery.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-brewery-list',
    templateUrl: './brewery-list.component.html',
    styleUrls: ['./brewery-list.component.css'],
})
export class BreweryListComponent implements OnInit, OnDestroy {
    @Input() breweries: Brewery[] = [];
    favoriteIdsSet = new Set<string>();
    private subscriptions: Subscription = new Subscription();

    constructor(
        private breweryService: BreweryService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadFavoriteIds();
    }

    loadFavoriteIds() {
        this.subscriptions.add(
            this.breweryService.getUserFavoriteIds().subscribe(
                (ids) => {
                    this.favoriteIdsSet = new Set(ids);
                },
                (error) => {
                    this.notificationService.showError('Failed to load favorite IDs');
                }
            )
        );
    }

    onBrewerySelected(id: string) {
        this.router.navigate(['/brewery', id]);
    }

    onAddFavorite(id: string) {
        this.subscriptions.add(
            this.breweryService.addFavorite(id).subscribe(
                () => {
                    this.favoriteIdsSet.add(id);
                },
                (error) => {
                    this.notificationService.showError('Failed to add brewery to favorites');
                }
            )
        );
    }

    onRemoveFavorite(id: string) {
        this.subscriptions.add(
            this.breweryService.removeFavorite(id).subscribe(
                () => {
                    this.favoriteIdsSet.delete(id);
                },
                (error) => {
                    this.notificationService.showError('Failed to remove brewery from favorites');
                }
            )
        );
    }

    onFavoriteSelected(breweryId: string) {
        if (this.isFavorite(breweryId)) {
            this.onRemoveFavorite(breweryId);
        } else {
            this.onAddFavorite(breweryId);
        }
    }

    isFavorite(id: string): boolean {
        return this.favoriteIdsSet.has(id);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
