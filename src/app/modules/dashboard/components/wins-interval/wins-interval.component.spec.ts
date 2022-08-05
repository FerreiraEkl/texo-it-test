import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinsIntervalComponent } from './wins-interval.component';

describe('WinsIntervalComponent', () => {
  let component: WinsIntervalComponent;
  let fixture: ComponentFixture<WinsIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinsIntervalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WinsIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
