import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreweryType } from 'src/app/models/brewery-type.enum';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';

@Component({
    selector: 'app-search-breweries',
    templateUrl: './search-breweries.component.html',
    styleUrls: ['./search-breweries.component.css'],
})
export class SearchBreweriesComponent implements OnInit {
    searchType: 'name' | 'criteria' = 'name';
    name: string = '';
    city: string = '';
    state: string = '';
    breweryType: BreweryType | null = null;
    breweryTypes = BreweryType;
    breweries: Brewery[] = [];
    favoriteIdsSet: Set<string> = new Set();

    constructor(
        private breweryService: BreweryService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.searchType = data['searchType'];
        });
        this.loadFavoriteIds();
    }

    loadFavoriteIds() {
        this.breweryService.getUserFavoriteIds().subscribe((data) => {
            this.favoriteIdsSet = new Set(data);
        });
    }

    search() {
        if (this.searchType === 'name') {
            this.breweryService
                .searchBreweries(this.name.trim())
                .subscribe((data) => {
                    this.breweries = data;
                });
        } else {
            this.breweryService
                .filterBreweries(
                    this.city.trim(),
                    this.state.trim(),
                    this.breweryType
                )
                .subscribe((data) => {
                    this.breweries = data;
                });
        }
    }

    onAddFavorite(breweryId: string) {
        this.breweryService.addFavorite(breweryId).subscribe(() => {
            this.favoriteIdsSet.add(breweryId);
        });
    }

    onRemoveFavorite(breweryId: string) {
        this.breweryService.removeFavorite(breweryId).subscribe(() => {
            this.favoriteIdsSet.delete(breweryId);
        });
    }

    onBrewerySelected(id: string) {
        this.router.navigate(['/brewery', id]);
    }

    isFavorite(breweryId: string): boolean {
        return this.favoriteIdsSet.has(breweryId);
    }
}
