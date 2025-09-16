import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterUserSignupComponent } from './cluster-user-signup.component';

describe('ClusterUserSignupComponent', () => {
  let component: ClusterUserSignupComponent;
  let fixture: ComponentFixture<ClusterUserSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterUserSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterUserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
