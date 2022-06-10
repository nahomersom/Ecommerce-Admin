import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractExtensionComponent } from './contract-extension.component';

describe('ContractExtensionComponent', () => {
  let component: ContractExtensionComponent;
  let fixture: ComponentFixture<ContractExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractExtensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
