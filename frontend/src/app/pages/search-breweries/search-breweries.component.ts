import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreweryType } from 'src/app/models/brewery-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
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

    constructor(
        private breweryService: BreweryService,
        private route: ActivatedRoute,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.searchType = data['searchType'];
        });
    }

    search() {
        if (this.searchType === 'name') {
            this.breweryService.searchBreweries(this.name.trim()).subscribe(
                (data) => {
                    this.breweries = data;
                },
                (error) => {
                    this.notificationService.showError(
                        'Error searching breweries'
                    );
                    console.error(error);
                }
            );
        } else {
            this.breweryService
                .filterBreweries(
                    this.city.trim(),
                    this.state.trim(),
                    this.breweryType
                )
                .subscribe(
                    (data) => {
                        this.breweries = data;
                    },
                    (error) => {
                        this.notificationService.showError(
                            'Error filtering breweries'
                        );
                        console.error(error);
                    }
                );
        }
    }
}
