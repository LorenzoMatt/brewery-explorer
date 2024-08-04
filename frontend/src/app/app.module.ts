import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreweryListComponent } from './components/brewery-list/brewery-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { BreweryDashboardComponent } from './pages/brewery-dashboard/brewery-dashboard.component';
import { BreweryDetailComponent } from './pages/brewery-detail/brewery-detail.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { BreweryService } from './services/brewery.service';

@NgModule({
    declarations: [
        AppComponent,
        PaginationComponent,
        BreweryListComponent,
        HeaderComponent,
        FooterComponent,
        BreweryDetailComponent,
        AuthComponent,
        BreweryDashboardComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
    providers: [
        AuthService,
        AuthGuard,
        BreweryService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
