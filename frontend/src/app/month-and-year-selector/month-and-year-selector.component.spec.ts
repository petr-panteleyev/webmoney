import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthAndYearSelectorComponent } from './month-and-year-selector.component';

describe('MonthAndYearSelectorComponent', () => {
  let component: MonthAndYearSelectorComponent;
  let fixture: ComponentFixture<MonthAndYearSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthAndYearSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthAndYearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
