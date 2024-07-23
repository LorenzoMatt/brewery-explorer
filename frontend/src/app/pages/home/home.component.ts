import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router
    ) {}

    ngOnInit() {
        this.loadBreweries();
        this.loadFavoriteIds();
    }

    loadBreweries() {
        this.breweryService
            .getBreweries(this.page, this.pageSize)
            .subscribe((data) => {
                this.breweries = data;
            });
    }

    loadFavoriteIds() {
        this.breweryService.getUserFavoriteIds().subscribe((ids) => {
            this.favoriteIdsSet = new Set(ids);
        });
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
        if (this.favoriteIdsSet.has(breweryId)) {
            this.breweryService.removeFavorite(breweryId).subscribe(() => {
                this.favoriteIdsSet.delete(breweryId);
            });
        } else {
            this.breweryService.addFavorite(breweryId).subscribe(() => {
                this.favoriteIdsSet.add(breweryId);
            });
        }
    }

    isFavorite(breweryId: string): boolean {
        return this.favoriteIdsSet.has(breweryId);
    }
}
