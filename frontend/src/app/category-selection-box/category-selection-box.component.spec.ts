import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectionBoxComponent } from './category-selection-box.component';

describe('CategorySelectionBoxComponent', () => {
  let component: CategorySelectionBoxComponent;
  let fixture: ComponentFixture<CategorySelectionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySelectionBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
