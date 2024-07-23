import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { BreweryDetailComponent } from './pages/brewery-detail/brewery-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchBreweriesComponent } from './pages/search-breweries/search-breweries.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'brewery/:id',
        component: BreweryDetailComponent,
        canActivate: [AuthGuard],
    },
    { path: 'auth', component: AuthComponent },
    {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'search-name',
        component: SearchBreweriesComponent,
        data: { searchType: 'name' },
        canActivate: [AuthGuard],
    },
    {
        path: 'search-criteria',
        component: SearchBreweriesComponent,
        data: { searchType: 'criteria' },
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
