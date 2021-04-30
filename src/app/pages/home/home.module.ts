import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent, SignupComponent, LoginComponent],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
})
export class HomeModule {}
