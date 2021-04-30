import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  showValidation: boolean = false;
  errorMessage!: string;
  userForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  //To access the forms values in the html
  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }

  //Show the response from the validation
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }

  login() {
    this.showValidation = true;
    let errors;
    //Validate the form
    if (this.userForm.status === 'VALID') {
      this.authService.loginUser(this.userForm.value).subscribe(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.router.navigate(['/admin']);
            this.showSuccess(res.message);
          }
        },
        (err) => {
          this.errorMessage = err.error.message;

          //Set the feedback from the backend depending on the msg error
          if (err.error.errors) {
            errors = err.error.errors;
            errors.map((result: any) => {
              this.showError(result.msg);
            });
            console.log(errors);
          } else {
            this.showError(err.error.message);
          }

          // if (this.errorMessage == 'Contraseña incorrecta') {
          //   console.log(this.errorMessage);
          //   this.userForm.controls['password'].setErrors({
          //     required: true,
          //   });
          // } else if (this.errorMessage == 'Usuario no encontrado') {
          //   console.log(this.errorMessage);
          //   this.userForm.controls['username'].setErrors({
          //     required: true,
          //   });
          //   this.userForm.setValue({ password: '' });
          // }
          console.log(this.userForm);
        }
      );
    }
  }
}
