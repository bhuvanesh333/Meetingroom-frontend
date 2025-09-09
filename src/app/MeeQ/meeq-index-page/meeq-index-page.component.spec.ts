import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeeqindexpageComponent } from './meeq-index-page.component';

describe('MeeqindexpageComponent', () => {
  let component: MeeqindexpageComponent;
  let fixture: ComponentFixture<MeeqindexpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeeqindexpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeeqindexpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
