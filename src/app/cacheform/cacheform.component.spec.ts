import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheformComponent } from './cacheform.component';

describe('CacheformComponent', () => {
  let component: CacheformComponent;
  let fixture: ComponentFixture<CacheformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacheformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
