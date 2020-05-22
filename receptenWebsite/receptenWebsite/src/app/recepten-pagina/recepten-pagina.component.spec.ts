import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptenPaginaComponent } from './recepten-pagina.component';

describe('ReceptenPaginaComponent', () => {
  let component: ReceptenPaginaComponent;
  let fixture: ComponentFixture<ReceptenPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptenPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptenPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
