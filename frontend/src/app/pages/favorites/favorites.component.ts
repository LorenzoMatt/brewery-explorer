import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
    breweries: Brewery[] = [];
    private subscriptions: Subscription = new Subscription();

    constructor(
        private breweryService: BreweryService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loadFavorites();
    }

    loadFavorites() {
        this.subscriptions.add(
            this.breweryService.getUserFavorites().subscribe(
                (data) => {
                    this.breweries = data;
                },
                (error) => {
                    this.notificationService.showError('Error loading favorites');
                    console.error(error);
                }
            )
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
