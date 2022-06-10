import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAndComplainComponent } from './feedback-and-complain.component';

describe('FeedbackAndComplainComponent', () => {
  let component: FeedbackAndComplainComponent;
  let fixture: ComponentFixture<FeedbackAndComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackAndComplainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAndComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
