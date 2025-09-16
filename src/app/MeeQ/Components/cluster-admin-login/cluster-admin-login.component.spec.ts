import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterloginComponent } from './cluster-admin-login.component';

describe('ClusterloginComponent', () => {
  let component: ClusterloginComponent;
  let fixture: ComponentFixture<ClusterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
