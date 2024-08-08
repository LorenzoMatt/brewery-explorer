import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ParamValidationGuard implements CanActivate {
    private validViews = ['home', 'favorites', 'search'];
    private validSearchTypes = ['name', 'criteria'];

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const view = route.paramMap.get('view');
        const searchType = route.paramMap.get('searchType');

        if (view && !this.validViews.includes(view)) {
            this.router.navigate(['']);
            return false;
        }

        if (searchType && !this.validSearchTypes.includes(searchType)) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}
