import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = {
    username: '',
    name: '',
    lastname: '',
    password: '',
    repeatpassword: '',
  };
  showValidation: boolean = false;
  errorMessage!: string;
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        password: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(5),
        ]),
        repeatpassword: new FormControl('', [Validators.required]),
      },
      { validators: this.MustMatch('password', 'repeatpassword') }
    );
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  //Show the response from the validation
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }

  //To access the forms values in the html
  get username() {
    return this.registerForm.get('username');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get repeatpassword() {
    return this.registerForm.get('repeatpassword');
  }

  signUp(form: any) {
    this.showValidation = true;
    let errors;

    //Validate the form
    if (this.registerForm.status === 'VALID') {
      this.authService.signUpUser(this.registerForm.value).subscribe(
        (res) => {
          if (res.status === 200) {
            this.showSuccess(res.message);
            location.reload();
            setTimeout(() => {}, 1000);
          }
        },
        (err) => {
          if (err.error.errors) {
            errors = err.error.errors;
            errors.map((result: any) => {
              this.showError(result.msg);
            });
          } else {
            this.showError(err.error.message);
          }
        }
      );
    }
  }
}
