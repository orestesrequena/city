import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VignobleComponent } from './vignoble.component';

describe('VignobleComponent', () => {
  let component: VignobleComponent;
  let fixture: ComponentFixture<VignobleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VignobleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VignobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
