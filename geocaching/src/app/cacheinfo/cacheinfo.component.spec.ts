import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheinfoComponent } from './cacheinfo.component';

describe('CacheinfoComponent', () => {
  let component: CacheinfoComponent;
  let fixture: ComponentFixture<CacheinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacheinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
