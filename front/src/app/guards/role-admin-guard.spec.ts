import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { roleAdminGuard } from './role-admin-guard';

describe('roleAdminGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
