import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthregisterPage } from './authregister.page';

describe('AuthregisterPage', () => {
  let component: AuthregisterPage;
  let fixture: ComponentFixture<AuthregisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
