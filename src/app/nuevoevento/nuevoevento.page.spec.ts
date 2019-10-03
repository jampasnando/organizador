import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoeventoPage } from './nuevoevento.page';

describe('NuevoeventoPage', () => {
  let component: NuevoeventoPage;
  let fixture: ComponentFixture<NuevoeventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoeventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoeventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
