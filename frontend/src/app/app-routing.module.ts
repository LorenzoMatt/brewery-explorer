import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BreweryDetailComponent } from './pages/brewery-detail/brewery-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchBreweriesComponent } from './pages/search-breweries/search-breweries.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'brewery/:id',
        component: BreweryDetailComponent,
        canActivate: [AuthGuard],
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
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
