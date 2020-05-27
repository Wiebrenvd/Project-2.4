import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptVanDeDagComponent } from './recept-van-de-dag.component';

describe('ReceptVanDeDagComponent', () => {
  let component: ReceptVanDeDagComponent;
  let fixture: ComponentFixture<ReceptVanDeDagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptVanDeDagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptVanDeDagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
