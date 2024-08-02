import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    breweries: Brewery[] = [];
    page = 1;
    pageSize = 10;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private breweryService: BreweryService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loadBreweries();
    }

    loadBreweries() {
        this.subscriptions.add(
            this.breweryService.getBreweries(this.page, this.pageSize).subscribe(
                (data) => {
                    this.breweries = data;
                },
                (error) => {
                    this.notificationService.showError('Error loading breweries');
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
        this.page = 1; // Reset to first page when page size changes
        this.loadBreweries();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
