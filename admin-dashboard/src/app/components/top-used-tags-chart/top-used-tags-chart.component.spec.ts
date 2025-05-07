import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUsedTagsChartComponent } from './top-used-tags-chart.component';

describe('TopUsedTagsChartComponent', () => {
  let component: TopUsedTagsChartComponent;
  let fixture: ComponentFixture<TopUsedTagsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUsedTagsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopUsedTagsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
