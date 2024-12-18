import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthloginPage } from './authlogin.page';

describe('AuthloginPage', () => {
  let component: AuthloginPage;
  let fixture: ComponentFixture<AuthloginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
