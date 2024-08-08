import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreweryType } from 'src/app/models/brewery-type.enum';
import { Brewery } from 'src/app/models/brewery.model';
import { BreweryService } from 'src/app/services/brewery.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-brewery-dashboard',
    templateUrl: './brewery-dashboard.component.html',
    styleUrls: ['./brewery-dashboard.component.css'],
})
export class BreweryDashboardComponent implements OnInit, OnDestroy {
    view: 'home' | 'favorites' | 'search' = 'home';
    breweries: Brewery[] = [];
    page = 1;
    pageSize = 10;
    searchType: 'name' | 'criteria' = 'name';
    name = '';
    city = '';
    state = '';
    breweryType: BreweryType | null = null;
    breweryTypes = BreweryType;

    private subscriptions = new Subscription();

    constructor(
        private breweryService: BreweryService,
        private notificationService: NotificationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscriptions.add(
            this.route.paramMap.subscribe((params) => {
                this.view = params.get('view') as
                    | 'home'
                    | 'favorites'
                    | 'search';
                const searchParam = params.get('searchType');

                if (this.view === 'search' && searchParam) {
                    this.searchType =
                        searchParam === 'criteria' ? 'criteria' : 'name';
                }

                this.breweries = [];
                if (this.view === null || this.view === 'home') {
                    this.view = 'home';
                    this.loadBreweries();
                } else if (this.view === 'favorites') {
                    this.loadFavorites();
                }
            })
        );
    }

    loadBreweries() {
        this.subscriptions.add(
            this.breweryService
                .getBreweries(this.page, this.pageSize)
                .subscribe(
                    (data) => {
                        this.breweries = data;
                    },
                    (error) => {
                        this.notificationService.showError(
                            'Error loading breweries'
                        );
                        console.error(error);
                    }
                )
        );
    }

    loadFavorites() {
        this.subscriptions.add(
            this.breweryService.getUserFavorites().subscribe(
                (data) => {
                    this.breweries = data;
                },
                (error) => {
                    this.notificationService.showError(
                        'Error loading favorites'
                    );
                    console.error(error);
                }
            )
        );
    }

    onPageChange(page: number) {
        this.page = page;
        this.loadBreweries();
    }

    onPageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
        this.page = 1;
        this.loadBreweries();
    }

    search() {
        if (this.searchType === 'name') {
            this.subscriptions.add(
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
                            this.notificationService.showError(
                                'Error filtering breweries'
                            );
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
