import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { roleUsuarioGuard } from './role-usuario-guard';

describe('roleUsuarioGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleUsuarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
