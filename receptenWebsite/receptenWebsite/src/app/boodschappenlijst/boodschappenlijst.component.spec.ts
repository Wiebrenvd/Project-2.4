import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoodschappenlijstComponent } from './boodschappenlijst.component';

describe('BoodschappenlijstComponent', () => {
  let component: BoodschappenlijstComponent;
  let fixture: ComponentFixture<BoodschappenlijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoodschappenlijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoodschappenlijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
