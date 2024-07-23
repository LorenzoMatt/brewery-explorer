import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBreweriesComponent } from './search-breweries.component';

describe('SearchBreweriesComponent', () => {
  let component: SearchBreweriesComponent;
  let fixture: ComponentFixture<SearchBreweriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBreweriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBreweriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
