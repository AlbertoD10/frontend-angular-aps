import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { ClientsService } from '../services/clients.service';

export function loginAuthValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.loginUser(control.value).pipe(
      map((user) => {
        console.log(user);

        const myUser = 'juanjo';
        return myUser ? { userExists: true } : null;
      })
    );
  };
}

// export function idClientValidator(
//   clientService: ClientsService
// ): AsyncValidatorFn {
//   return (control: AbstractControl) => {
//     return clientService.getClient('kevin').pipe(
//       map((user) => {
//         const myUser = 'juanjo';
//         return myUser ? { userExists: true } : null;
//       })
//     );
//   };
// }
