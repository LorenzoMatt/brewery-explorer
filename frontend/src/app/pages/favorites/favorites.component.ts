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
        });
    }

    onBrewerySelected(id: string) {
        this.router.navigate(['/brewery', id]);
    }
}
