import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('Auth Service', () => {
  let service: Auth;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Auth,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should login and store token', () => {
    const mockToken = 'test-token';

    service.login('test@mail.com', 'password').subscribe();

    const req = httpMock.expectOne('https://reqres.in/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: mockToken });

    expect(localStorage.getItem('auth_token')).toBe(mockToken);
  });

  it('should not store token if res.token is missing', () => {
    service.login('test@mail.com', 'password').subscribe();

    const req = httpMock.expectOne('https://reqres.in/api/login');
    req.flush({}); // response tanpa token

    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('should handle login error', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };

    service.login('test@mail.com', 'wrong-password').subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
      }
    });

    const req = httpMock.expectOne('https://reqres.in/api/login');
    req.flush({ error: 'Invalid credentials' }, errorResponse);
  });

  it('should logout and clear token', () => {
    localStorage.setItem('auth_token', 'dummy');
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if logged in', () => {
    localStorage.setItem('auth_token', 'dummy');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if not logged in', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });
});
