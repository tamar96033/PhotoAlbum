import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsChartsComponentComponent } from './analytics-charts-component.component';

describe('AnalyticsChartsComponentComponent', () => {
  let component: AnalyticsChartsComponentComponent;
  let fixture: ComponentFixture<AnalyticsChartsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsChartsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsChartsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
