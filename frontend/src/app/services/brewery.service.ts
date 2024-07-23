import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Brewery } from '../models/brewery.model';

@Injectable({
    providedIn: 'root',
})
export class BreweryService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getBreweries(page: number, size: number): Observable<Brewery[]> {
        return this.http.get<Brewery[]>(
            `${this.apiUrl}/breweries?page=${page}&size=${size}`
        );
    }

    getBreweryById(id: string): Observable<Brewery> {
        return this.http.get<Brewery>(`${this.apiUrl}/breweries/${id}`);
    }

    getUserFavorites(): Observable<Brewery[]> {
        return this.http.get<Brewery[]>(`${this.apiUrl}/favorites`);
    }

    getUserFavoriteIds(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/favorites/ids`);
    }

    addFavorite(breweryId: string): Observable<void> {
        return this.http.post<void>(
            `${environment.apiUrl}/favorites/add`,
            null,
            {
                params: { breweryId },
            }
        );
    }

    removeFavorite(breweryId: string): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiUrl}/favorites/remove`,
            {
                params: { breweryId },
            }
        );
    }
}
