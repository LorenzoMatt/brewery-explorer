import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-brewery-detail',
    templateUrl: './brewery-detail.component.html',
    styleUrls: ['./brewery-detail.component.css'],
})
export class BreweryDetailComponent implements OnInit, OnDestroy {
    brewery: Brewery | null = null;
    isFavorite = false;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private breweryService: BreweryService,
        private location: Location,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.subscriptions.add(
                this.breweryService.getBreweryById(id).subscribe(
                    (data) => {
                        this.brewery = data;
                        this.checkIfFavorite(id);
                    },
                    (error) => {
                        this.notificationService.showError('Error fetching brewery details');
                        console.error(error);
                    }
                )
            );
        }
    }

    checkIfFavorite(breweryId: string) {
        this.subscriptions.add(
            this.breweryService.isFavorite(breweryId).subscribe((isFavorite) => {
                this.isFavorite = isFavorite;
            })
        );
    }

    addToFavorites() {
        if (this.brewery) {
            this.subscriptions.add(
                this.breweryService.addFavorite(this.brewery.id).subscribe(
                    () => {
                        this.isFavorite = true;
                    },
                    (error) => {
                        this.notificationService.showError('Failed to add brewery to favorites');
                    }
                )
            );
        }
    }

    removeFromFavorites() {
        if (this.brewery) {
            this.subscriptions.add(
                this.breweryService.removeFavorite(this.brewery.id).subscribe(
                    () => {
                        this.isFavorite = false;
                    },
                    (error) => {
                        this.notificationService.showError('Failed to remove brewery from favorites');
                    }
                )
            );
        }
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
