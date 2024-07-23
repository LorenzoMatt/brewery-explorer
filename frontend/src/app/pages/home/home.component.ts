import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    breweries: Brewery[] = [];
    favoriteIdsSet: Set<string> = new Set<string>();
    page = 1;
    pageSize = 10;

    constructor(
        private breweryService: BreweryService,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loadBreweries();
        this.loadFavoriteIds();
    }

    loadBreweries() {
        this.breweryService.getBreweries(this.page, this.pageSize).subscribe(
            (data) => {
                this.breweries = data;
            },
            (error) => {
                this.notificationService.showError('Error loading breweries');
                console.error(error);
            }
        );
    }

    loadFavoriteIds() {
        this.breweryService.getUserFavoriteIds().subscribe(
            (data) => {
                this.favoriteIdsSet = new Set(data);
            },
            (error) => {
                this.notificationService.showError(
                    'Error loading favorite IDs'
                );
                console.error(error);
            }
        );
    }

    onPageChange(page: number) {
        this.page = page;
        this.loadBreweries();
    }

    onPageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
        this.page = 1; // Reset to first page when page size changes
        this.loadBreweries();
    }

    onBrewerySelected(id: string) {
        this.router.navigate(['/brewery', id]);
    }

    onAddFavorite(breweryId: string) {
        this.breweryService.addFavorite(breweryId).subscribe(
            () => {
                this.favoriteIdsSet.add(breweryId);
            },
            (error) => {
                this.notificationService.showError('Error adding to favorites');
                console.error(error);
            }
        );
    }

    onRemoveFavorite(breweryId: string) {
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

    isFavorite(breweryId: string): boolean {
        return this.favoriteIdsSet.has(breweryId);
    }
}
