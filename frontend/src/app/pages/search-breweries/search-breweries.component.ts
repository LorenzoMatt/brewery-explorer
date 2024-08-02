import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreweryType } from 'src/app/models/brewery-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';

@Component({
    selector: 'app-search-breweries',
    templateUrl: './search-breweries.component.html',
    styleUrls: ['./search-breweries.component.css'],
})
export class SearchBreweriesComponent implements OnInit, OnDestroy {
    searchType: 'name' | 'criteria' = 'name';
    name: string = '';
    city: string = '';
    state: string = '';
    breweryType: BreweryType | null = null;
    breweryTypes = BreweryType;
    breweries: Brewery[] = [];
    private subscriptions: Subscription = new Subscription();

    constructor(
        private breweryService: BreweryService,
        private route: ActivatedRoute,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.subscriptions.add(
            this.route.data.subscribe((data) => {
                this.searchType = data['searchType'];
            })
        );
    }

    search() {
        if (this.searchType === 'name') {
            this.subscriptions.add(
                this.breweryService.searchBreweries(this.name.trim()).subscribe(
                    (data) => {
                        this.breweries = data;
                    },
                    (error) => {
                        this.notificationService.showError('Error searching breweries');
                        console.error(error);
                    }
                )
            );
        } else {
            this.subscriptions.add(
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
                            this.notificationService.showError('Error filtering breweries');
                            console.error(error);
                        }
                    )
            );
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
