import { Injectable } from "@angular/core";
import { Auth } from "./auth";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
    } 
    return true;
    }
  }
