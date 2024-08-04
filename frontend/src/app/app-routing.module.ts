import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ParamValidationGuard } from './guards/param-validation.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { BreweryDashboardComponent } from './pages/brewery-dashboard/brewery-dashboard.component';
import { BreweryDetailComponent } from './pages/brewery-detail/brewery-detail.component';

const routes: Routes = [
    {
        path: '',
        component: BreweryDashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'brewery/:id',
        component: BreweryDetailComponent,
        canActivate: [AuthGuard],
    },
    { path: 'auth', component: AuthComponent },
    {
        path: 'dashboard/:view',
        component: BreweryDashboardComponent,
        canActivate: [AuthGuard, ParamValidationGuard],
    },
    {
        path: 'dashboard/:view/:searchType',
        component: BreweryDashboardComponent,
        canActivate: [AuthGuard, ParamValidationGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
