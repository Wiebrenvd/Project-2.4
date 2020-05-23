import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoodschappenlijstjeComponent } from './boodschappenlijstje.component';

describe('BoodschappenlijstjeComponent', () => {
  let component: BoodschappenlijstjeComponent;
  let fixture: ComponentFixture<BoodschappenlijstjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoodschappenlijstjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoodschappenlijstjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
