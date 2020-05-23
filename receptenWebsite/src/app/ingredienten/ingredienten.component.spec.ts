import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientenComponent } from './ingredienten.component';

describe('IngredientenComponent', () => {
  let component: IngredientenComponent;
  let fixture: ComponentFixture<IngredientenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
