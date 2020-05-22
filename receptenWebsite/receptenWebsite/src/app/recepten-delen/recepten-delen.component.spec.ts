import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptenDelenComponent } from './recepten-delen.component';

describe('ReceptenDelenComponent', () => {
  let component: ReceptenDelenComponent;
  let fixture: ComponentFixture<ReceptenDelenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptenDelenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptenDelenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
