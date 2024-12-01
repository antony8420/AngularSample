import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadingFirstComponent } from './lazy-loading-first.component';

describe('LazyLoadingFirstComponent', () => {
  let component: LazyLoadingFirstComponent;
  let fixture: ComponentFixture<LazyLoadingFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyLoadingFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyLoadingFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
