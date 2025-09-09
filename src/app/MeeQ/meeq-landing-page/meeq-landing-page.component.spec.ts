import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeeQLandingPageComponent } from './meeq-landing-page.component';

describe('MeeQLandingPageComponent', () => {
  let component: MeeQLandingPageComponent;
  let fixture: ComponentFixture<MeeQLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeeQLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeeQLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
