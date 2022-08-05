import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudiosComponent } from './top-studios.component';

describe('TopStudiosComponent', () => {
  let component: TopStudiosComponent;
  let fixture: ComponentFixture<TopStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopStudiosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
