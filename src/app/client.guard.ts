import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ClientsService } from './services/clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private clientService: ClientsService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogged() && this.clientService.storedClient()) {
      return true;
    }
    this.router.navigate(['/admin']);
    return false;
  }
}
