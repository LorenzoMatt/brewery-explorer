import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryDashboardComponent } from './brewery-dashboard.component';

describe('BreweryDashboardComponent', () => {
  let component: BreweryDashboardComponent;
  let fixture: ComponentFixture<BreweryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreweryDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreweryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
