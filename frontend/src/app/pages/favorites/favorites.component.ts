import { Component, OnInit } from '@angular/core';
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

    constructor(
        private breweryService: BreweryService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loadFavorites();
    }

    loadFavorites() {
        this.breweryService.getUserFavorites().subscribe(
            (data) => {
                this.breweries = data;
            },
            (error) => {
                this.notificationService.showError('Error loading favorites');
                console.error(error);
            }
        );
    }
}
