import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustersignupComponent } from './cluster-admin-signup.component';

describe('ClustersignupComponent', () => {
  let component: ClustersignupComponent;
  let fixture: ComponentFixture<ClustersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClustersignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClustersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
