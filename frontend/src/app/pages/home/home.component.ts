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
    page = 1;
    pageSize = 10;

    constructor(
        private breweryService: BreweryService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadBreweries();
    }

    loadBreweries() {
        this.breweryService
            .getBreweries(this.page, this.pageSize)
            .subscribe((data) => {
                this.breweries = data;
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
}
