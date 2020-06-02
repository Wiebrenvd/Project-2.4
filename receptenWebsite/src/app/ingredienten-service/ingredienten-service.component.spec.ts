import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientenServiceComponent } from './ingredienten-service.component';

describe('IngredientenServiceComponent', () => {
  let component: IngredientenServiceComponent;
  let fixture: ComponentFixture<IngredientenServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientenServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientenServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
