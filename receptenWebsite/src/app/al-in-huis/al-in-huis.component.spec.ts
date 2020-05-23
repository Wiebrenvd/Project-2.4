import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlInHuisComponent } from './al-in-huis.component';

describe('AlInHuisComponent', () => {
  let component: AlInHuisComponent;
  let fixture: ComponentFixture<AlInHuisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlInHuisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlInHuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
