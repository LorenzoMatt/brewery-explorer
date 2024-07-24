import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BreweryType } from '../models/brewery-type.enum';
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

    filterBreweries(
        city: string,
        state: string,
        breweryType: BreweryType | null
    ): Observable<Brewery[]> {
        let params = new HttpParams();
        if (city) params = params.set('city', city);
        if (state) params = params.set('state', state);
        if (breweryType) params = params.set('breweryType', breweryType);
        return this.http.get<Brewery[]>(`${this.apiUrl}/breweries/search`, {
            params,
        });
    }

    searchBreweries(name: string): Observable<Brewery[]> {
        let params = new HttpParams().set('name', name);
        return this.http.get<Brewery[]>(`${this.apiUrl}/breweries/search`, {
            params,
        });
    }

    isFavorite(breweryId: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${this.apiUrl}/favorites/is-favorite?breweryId=${breweryId}`
        );
    }
}
