import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReserveComponent } from './user-reserve.component';

describe('UserReserveComponent', () => {
  let component: UserReserveComponent;
  let fixture: ComponentFixture<UserReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
