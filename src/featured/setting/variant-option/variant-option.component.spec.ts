import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantOptionComponent } from './variant-option.component';

describe('VariantOptionComponent', () => {
  let component: VariantOptionComponent;
  let fixture: ComponentFixture<VariantOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
