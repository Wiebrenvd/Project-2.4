import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptenInHuisComponent } from './recepten-in-huis.component';

describe('ReceptenInHuisComponent', () => {
  let component: ReceptenInHuisComponent;
  let fixture: ComponentFixture<ReceptenInHuisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptenInHuisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptenInHuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
