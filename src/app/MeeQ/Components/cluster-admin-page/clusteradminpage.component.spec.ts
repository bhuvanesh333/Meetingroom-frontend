import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteradminpageComponent } from './clusteradminpage.component';

describe('ClusteradminpageComponent', () => {
  let component: ClusteradminpageComponent;
  let fixture: ComponentFixture<ClusteradminpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusteradminpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusteradminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
